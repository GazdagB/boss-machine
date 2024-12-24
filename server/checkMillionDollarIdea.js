
const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;

    // Validate input
    if (!numWeeks || !weeklyRevenue || isNaN(numWeeks) || isNaN(weeklyRevenue)) {
        return res.status(400).send('Invalid input: numWeeks and weeklyRevenue must be valid numbers.');
    }

    // Calculate total revenue
    const totalRevenue = Number(numWeeks) * Number(weeklyRevenue);

    if (totalRevenue >= 1000000) {
        return next(); // Proceed if idea is sufficiently profitable
    }

    // Handle insufficiently profitable ideas
    return res.status(400).send('This is not a million dollar idea.');
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
