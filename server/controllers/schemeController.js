const Scheme = require('../models/Scheme');

exports.getSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ createdAt: -1 });
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createScheme = async (req, res) => {
  try {
    const { title, description, eligibility, documents, applicationDeadline } = req.body;
    
    const scheme = new Scheme({
      title,
      description,
      eligibility,
      documents,
      applicationDeadline
    });

    await scheme.save();
    res.status(201).json(scheme);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}; 