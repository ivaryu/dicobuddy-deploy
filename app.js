const allowedOrigins = isDev 
  ? [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "http://localhost:3000",
      "http://localhost:5000",
    ]
  : [
      process.env.FRONTEND_URL || "https://glittering-lollipop-9abd21.netlify.app",
      process.env.BACKEND_URL
    ].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    // Normalize: remove trailing slash untuk comparison
    const normalizedOrigin = origin.replace(/\/$/, '');
    const normalizedAllowed = allowedOrigins.map(o => o.replace(/\/$/, ''));
    
    if (normalizedAllowed.indexOf(normalizedOrigin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`❌ CORS blocked origin: ${origin}`);
      console.warn(`✅ Allowed origins:`, normalizedAllowed);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
