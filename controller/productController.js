const product = require('../model/product')

module.exports.createProducts = async (req, res) => {
    try {
        const newProducts = new product(req.body)

        const result = await newProducts.save()

        res.status(200).json(result)
    } catch (error) {
        console.log(`server error ${error}`);
        res.status(500).json(`server error ${error}`)
    }
}

module.exports.getProducts = async (req, res) => {
    try {
        const { page = 1, search = '', category = '', minPrice = 0, maxPrice = Infinity, sortBy='' } = req.query;

        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        // Build the query
        const query = {
            name: { $regex: search, $options: 'i' },
            price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
        };

        if (category) {
            query.category = category;
        }

        // Determine sorting options
        let sort = {};
        if (sortBy.includes('priceAsc')) {
            sort = { price: 1 };
        } else if (sortBy.includes('priceDesc')) {
            sort = { price: -1 };
        } else if (sortBy.includes('dateDesc')) {
            sort = { createdAt: -1 };
        }else{
            sort={}
        }

        // Fetch total product count and paginated results
        const totalProducts = await product.countDocuments(query);
        const products = await product.find(query)
            .sort(sort)
            .skip(skip)
            .limit(pageSize);

        res.json({ products, totalPages: Math.ceil(totalProducts / pageSize) });

    } catch (error) {
        console.log(`Server error: ${error}`);
        res.status(500).json(`Server error: ${error}`);
    }
};
