import { makeAutoObservable } from 'mobx';
import { pagingCountries, editCountry, deleteCountry, createCountry } from './CountryService';

class CountryStore {
  countryList = []; // List of countries

  constructor() {
    makeAutoObservable(this); // Automatically track changes to properties
  }

  // Fetch the list of countries from the API
  async fetchCountryList() {
    try {
      const response = await pagingCountries({ pageIndex: 1, pageSize: 5 });
      this.countryList = response.data.content;
    } catch (error) {
      console.error('Error fetching country list:', error);
    }
  }

  // Add a new country
  async addCountry(newCountry) {
    try {
      await createCountry(newCountry);
      this.countryList.push(newCountry);
    } catch (error) {
      console.error('Error adding country:', error);
    }
  }

  // Delete a country
  async deleteCountry(countryId) {
    try {
      await deleteCountry(countryId);
      this.countryList = this.countryList.filter(country => country.id !== countryId);
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  }

  // Edit a country
  async editCountry(editedCountry) {
    try {
      await editCountry(editedCountry);
      this.countryList = this.countryList.map(country =>
        country.id === editedCountry.id ? editedCountry : country
      );
    } catch (error) {
      console.error('Error editing country:', error);
    }
  }
}

export default new CountryStore();
