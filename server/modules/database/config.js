const config = {
    test: {
        connectionString: "mongodb://localhost:27017/WebAppTest",
        db: "WebAppTest"        
    },
    development:{
        connectionString: "mongodb://localhost:27017/WebApp",
        db: "WebApp"
    }
}
const ConfigEnv = config[process.env.CONFIG];
const Config = config;

export { Config, ConfigEnv }