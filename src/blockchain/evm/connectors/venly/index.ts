export interface VenlyConnectorOptions {
  clientId: string;
  secretType?: string;
  environment?: string;
  network?: string;
}

const ConnectToVenly = (defaultOptions: VenlyConnectorOptions) => {
  return new Promise(async (resolve, reject) => {
    if (defaultOptions && defaultOptions.clientId) {
      try {
        const options = {
          clientId: defaultOptions.clientId,
          secretType: defaultOptions.secretType || 'ETHEREUM',
          environment: defaultOptions.environment,
          signMethod: 'POPUP',
        };
        const provider = await (window as any).Venly.createProviderEngine(
          options
        );
        return resolve(provider);
      } catch (error) {
        console.error(error);
        return reject(new Error('Failed to login to Venly'));
      }
    } else {
      return reject(new Error('Please provide an Venly client id'));
    }
  });
};

export default ConnectToVenly;
