const Agency = require('../models/agency');

// Create a new agency
exports.createAgency = async (req, res) => {
  try {
    const { Name, Address1, Address2, State, City, PhoneNumber } = req.body;

    // Validate required fields
    if (!Name || !Address1 || !State || !City || !PhoneNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const agency = new Agency({
      Name,
      Address1,
      Address2,
      State,
      City,
      PhoneNumber,
    });

    await agency.save();

    res.status(201).json({ message: 'Agency created successfully', agency });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all agencies
exports.getAllAgencies = async (req, res) => {
  try {
    const agencies = await Agency.find();
    res.status(200).json(agencies);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get agency by ID
exports.getAgencyById = async (req, res) => {
  try {
    const agency = await Agency.findById(req.params.id);
    if (!agency) {
      return res.status(404).json({ error: 'Agency not found' });
    }
    res.status(200).json(agency);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update agency by ID
exports.updateAgency = async (req, res) => {
  try {
    const { Name, Address1, Address2, State, City, PhoneNumber } = req.body;

    // Validate required fields
    if (!Name || !Address1 || !State || !City || !PhoneNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const agency = await Agency.findByIdAndUpdate(
      req.params.id,
      {
        Name,
        Address1,
        Address2,
        State,
        City,
        PhoneNumber,
      },
      { new: true }
    );

    if (!agency) {
      return res.status(404).json({ error: 'Agency not found' });
    }

    res.status(200).json({ message: 'Agency updated successfully', agency });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete agency by ID
exports.deleteAgency = async (req, res) => {
  try {
    const agency = await Agency.findByIdAndRemove(req.params.id);

    if (!agency) {
      return res.status(404).json({ error: 'Agency not found' });
    }

    res.status(200).json({ message: 'Agency deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
