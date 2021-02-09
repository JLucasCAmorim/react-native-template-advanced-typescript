import AsyncStorage from '@react-native-community/async-storage';

const deviceStorage = {
  state: {
    token: '',
  },

  async setItem(key: string, value: string | number | boolean) {
    if (!key) {
      return;
    }

    try {
      const newValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, newValue);
    } catch (error) {
      console.log(`AsyncStorage Error: ${error.message}`);
    }
  },

  async getItem(key: string) {
    if (!key) {
      return null;
    }

    const parseJson = (item: string): string => {
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    };

    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? parseJson(value) : value;
    } catch (error) {
      console.log(`AsyncStorage Error: ${error.message}`);
      return undefined;
    }
  },

  async deleteItem(key: string) {
    if (!key) {
      return;
    }

    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(`AsyncStorage Error: ${error.message}`);
    }
  },

  async setToken(value: string) {
    this.state.token = value;
    this.setItem('@app:token', value);
  },

  async getToken() {
    const value = await this.getItem('@app:token');
    if (value) {
      this.state.token = value;
    }
    return value;
  },

  async removeToken() {
    this.deleteItem('@app:token');
  },
};

export default deviceStorage;
