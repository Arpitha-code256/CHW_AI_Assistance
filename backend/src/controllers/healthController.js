import { getDBStatus } from '../config/db.js';

export const getHealthStatus = (req, res) => {
  const dbStatus = getDBStatus();

  res.status(200).json({
    status: 'healthy',
    project: 'Community Health Worker Assistance Platform API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: dbStatus,
      connected: dbStatus === 'connected',
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
    },
  });
};
