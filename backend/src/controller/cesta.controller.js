const cestaCtrl = {}

const Producto = require('../models/Producto')



cestaCtrl.addProductoCesta = async (req, res) => {
    const { productoId, cantidad } = req.body;

    try {
        // Verificar si el producto existe
        const producto = await Producto.findById(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Recuperar la cesta de compras del usuario desde la sesión o inicializarla si no existe
        req.session.cesta = req.session.cesta || [];

        // Verificar si el producto ya está en la cesta
        const productoIndex = req.session.cesta.findIndex(item => item.productoId === productoId);

        if (productoIndex !== -1) {
            // Si el producto ya está en la cesta, actualizar la cantidad
            req.session.cesta[productoIndex].cantidad += cantidad;
        } else {
            // Si el producto no está en la cesta, agregarlo
            req.session.cesta.push({ productoId, cantidad });
        }

        res.status(200).json({ message: 'Producto agregado a la cesta' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


cestaCtrl.getCesta = async (req, res) => {
    try {
        const cesta = req.session.cesta || [];
        const productosEnCesta = [];

        // Obtener detalles de los productos en la cesta
        for (const item of cesta) {
            const producto = await Producto.findById(item.productoId);
            if (producto) {
                productosEnCesta.push({ producto, cantidad: item.cantidad });
            }
        }

        res.status(200).json({ cesta: productosEnCesta });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


cestaCtrl.updateCesta = async (req, res) => {
    const { productoId } = req.params;
    const { cantidad } = req.body;

    try {
        // Recuperar la cesta de compras del usuario desde la sesión
        const cesta = req.session.cesta || [];

        // Buscar el producto en la cesta
        const productoIndex = cesta.findIndex(item => item.productoId === productoId);

        if (productoIndex !== -1) {
            // Si el producto está en la cesta, actualizar la cantidad
            req.session.cesta[productoIndex].cantidad = cantidad;
            res.status(200).json({ message: 'Cantidad de producto actualizada en la cesta' });
        } else {
            // Si el producto no está en la cesta, devolver un error
            res.status(404).json({ message: 'Producto no encontrado en la cesta' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

cestaCtrl.deleteProductoCesta = async (req, res) => {
    const productoId= req.params.id;
    try {
        // Recuperar la cesta de compras del usuario desde la sesión
        let cesta = req.session.cesta || [];

        // Crear una nueva lista de productos en la cesta excluyendo el producto a eliminar
        const nuevaCesta = [];
        for (const item of cesta) {
            // Verificar si item y item.productoId son definidos antes de acceder a sus propiedades
            if (item && item.productoId) {
            
                // Convertir el productoId del elemento en la cesta a string para la comparación
                const stringItemId = item.productoId.toString();
                // Convertir el productoId de la solicitud a string para la comparación
                const stringProductoId = productoId.toString();
                if (stringItemId !== stringProductoId) {
                    nuevaCesta.push(item);
                }
            
            }
        }

        // Actualizar la cesta en la sesión con la nueva lista
        req.session.cesta = nuevaCesta;
        console.log("req.session.cesta: ",req.session.cesta)

        res.status(200).json({ message: 'Producto eliminado de la cesta' });
    } catch (error) {
        res.status(500);
    }
}






module.exports = cestaCtrl
