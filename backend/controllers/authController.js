const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');

// Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Register candidate
const registerCandidate = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'Email already registered' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user and candidate profile
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        phone,
        role: 'CANDIDATE',
        candidateProfile: {
          create: {
            fullName,
            skills: [],
            profileStrength: 20
          }
        }
      },
      include: {
        candidateProfile: true
      }
    });

    // Generate token
    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.candidateProfile.fullName
      }
    });

  } catch (error) {
    console.error('Register candidate error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Register company
const registerCompany = async (req, res) => {
  try {
    const { companyName, email, phone, password, city } = req.body;

    if (!companyName || !email || !phone || !password) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'Email already registered' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        phone,
        role: 'COMPANY',
        companyProfile: {
          create: {
            companyName,
            city: city || '',
            isVerified: false
          }
        }
      },
      include: {
        companyProfile: true
      }
    });

    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: 'Company account created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        companyName: user.companyProfile.companyName
      }
    });

  } catch (error) {
    console.error('Register company error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        candidateProfile: true,
        companyProfile: true
      }
    });

    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }

    const token = generateToken(user.id, user.role);

    // Build response based on role
    const userData = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    if (user.role === 'CANDIDATE' && user.candidateProfile) {
      userData.fullName = user.candidateProfile.fullName;
      userData.profileStrength = user.candidateProfile.profileStrength;
    }

    if (user.role === 'COMPANY' && user.companyProfile) {
      userData.companyName = user.companyProfile.companyName;
      userData.isVerified = user.companyProfile.isVerified;
    }

    res.json({
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        candidateProfile: true,
        companyProfile: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });

  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerCandidate,
  registerCompany,
  login,
  getMe
};