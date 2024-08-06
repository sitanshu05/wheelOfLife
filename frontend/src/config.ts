interface ENV {
    SERVER_API_URL : string | undefined
}

interface CONFIG { 
    SERVER_API_URL : string
}

function getConfig() : ENV {
    return {
        SERVER_API_URL : import.meta.env.VITE_SERVER_API_URL
    }
}

const getSanitizedConfig = (config: ENV): CONFIG => {
    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
        throw new Error(`Missing key ${key} in config.env`);
      }
    }
    return config as CONFIG;
  };
  
  const config = getConfig();
  
  const sanitizedConfig = getSanitizedConfig(config);
  
  export default sanitizedConfig;