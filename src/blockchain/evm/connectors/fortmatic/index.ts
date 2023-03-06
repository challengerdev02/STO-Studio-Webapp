export interface FortmaticConnectorOptions {
  key: string;
  network?: string;
}

const ConnectToFortmatic = async (
  Fortmatic: any,
  options: FortmaticConnectorOptions
) => {
  if (options && options.key) {
    try {
      const key = options.key;
      const fortmatic = new Fortmatic(key, options.network);
      const provider = await fortmatic.getProvider();
      provider.fortmatic = fortmatic;
      await fortmatic.user.login();
      const isLoggedIn = await fortmatic.user.isLoggedIn();
      if (isLoggedIn) {
        return provider;
      } else {
        throw new Error('Failed to login to Fortmatic');
      }
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error('Missing Fortmatic key');
  }
};

export default ConnectToFortmatic;
