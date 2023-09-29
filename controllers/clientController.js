const Client = require("../models/client");
const Agency = require("../models/agency");

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const { AgencyId, Name, Email, PhoneNumber, TotalBill } = req.body;

    // Validate required fields
    if (!AgencyId || !Name || !Email || !PhoneNumber || !TotalBill) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the agency exists
    const agency = await Agency.findById(AgencyId);
    if (!agency) {
      return res.status(404).json({ error: "Agency not found" });
    }

    const client = new Client({
      AgencyId,
      Name,
      Email,
      PhoneNumber,
      TotalBill,
    });

    await client.save();

    res.status(201).json({ message: "Client created successfully", client });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    // Find the agency with the top client(s) with maximum total bill
    const agency = await Agency.aggregate([
      {
        $lookup: {
          from: "clients",
          localField: "_id",
          foreignField: "AgencyId",
          as: "clients",
        },
      },
      {
        $unwind: "$clients",
      },
      {
        $group: {
          _id: '$_id',
          AgencyName: { $first: '$Name' },
          topClient: {
            $push: {
              ClientName: '$clients.Name',
              TotalBill: '$clients.TotalBill',
            },
          },
          maxTotalBill: { $max: '$clients.TotalBill' }, // Add this line
        },
      },
      {
        $project: {
          _id: 0,
          AgencyName: 1,
          topClient: {
            $filter: {
              input: '$topClient',
              as: 'client',
              cond: { $eq: ['$$client.TotalBill', '$maxTotalBill'] }, // Add this line
            },
          },
        },
      },
    ]);

    if (agency.length === 0) {
      return res.status(404).json({ error: "No agencies found" });
    }

    res.status(200).json(agency[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get client by ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update client by ID
exports.updateClient = async (req, res) => {
  try {
    const { Name, Email, PhoneNumber, TotalBill } = req.body;

    // Validate required fields
    if (!Name || !Email || !PhoneNumber || !TotalBill) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      {
        Name,
        Email,
        PhoneNumber,
        TotalBill,
      },
      { new: true }
    );

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json({ message: "Client updated successfully", client });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete client by ID
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndRemove(req.params.id);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createAgencyClient = async (req, res) => {
  try {
    const { agencyData, clientData } = req.body;

    // Validate required fields for agency and client
    if (!agencyData || !clientData) {
      return res.status(400).json({ error: "Missing agency or client data" });
    }

    // Create the agency
    const agency = new Agency(agencyData);
    await agency.save();

    // Assign the agency ID to the client and create the client
    clientData.AgencyId = agency._id;
    const client = new Client(clientData);
    await client.save();

    res.status(201).json({ message: "Agency and client created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};