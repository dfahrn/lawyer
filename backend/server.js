// Essential middleware
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression
app.use(cors({
  origin: process.env.CORS_ORIGIN
})); 