// scripts/convert.ts

import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a require function to import CommonJS modules
const require = createRequire(import.meta.url);
const csv = require('csvtojson');

/**
 * Interface Definitions
 */

// Main structure of data.json
interface DataJson {
  heroSection: HeroSection;
  artworks: Artwork[];
  galleryInfo: GalleryInfo;
  artworkCategories: ArtworkCategory[];
  filters: Filters;
  whatsappMobileNumber: string;
  contact: string;
}

// Structure for artworks
interface Artwork {
  id: number;
  imageUrl: string;
  artist: string;
  title: string;
  medium: string;
  dimensions: string;
  style: string;
  size: string;
  layout: string;
}

// Structure for artwork categories
interface ArtworkCategory {
  title: string;
  count: number;
}

// Structure for filters
interface Filters {
  styles: string[];
  mediums: string[];
  sizes: string[];
  layouts: string[];
}

// Structure for hero section
interface HeroSection {
  imageUrl: string;
  mobileImageUrl: string;
  title: string;
  description: string;
}

// Structure for gallery info
interface GalleryInfo {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  imageUrl: string;
}

// Structure for contact info
interface ContactInfo {
  whatsappMobileNumber: string;
  contact: string;
}

/**
 * Paths Configuration
 */

const dataSourceDir = path.join(__dirname, '../data-source');
const publicDir = path.join(__dirname, '../public');
const outputJsonPath = path.join(publicDir, 'data.json');

/**
 * Utility Functions
 */

// Function to convert standard CSV to JSON array
const convertCSVToJSON = async (filePath: string): Promise<Record<string, string>[]> => {
  try {
    const jsonArray: Record<string, string>[] = await csv().fromFile(filePath);
    return jsonArray;
  } catch (error) {
    console.error(`Error converting ${filePath} to JSON:`, error);
    return [];
  }
};

// Function to convert key-value CSV to an object
const convertKeyValueCSVToObject = async (filePath: string): Promise<Record<string, string>> => {
  try {
    const jsonArray: Record<string, string>[] = await csv().fromFile(filePath);
    const obj: Record<string, string> = {};
    jsonArray.forEach((item: Record<string, string>) => {
      const key = item.key.trim();     // Corrected: Directly access 'key'
      const value = item.value.trim(); // Corrected: Directly access 'value'
      obj[key] = value;
    });
    return obj;
  } catch (error) {
    console.error(`Error converting ${filePath} to Object:`, error);
    return {};
  }
};

/**
 * Main Function to Build data.json
 */

const buildDataJson = async () => {
  const data: DataJson = {
    heroSection: {
      imageUrl: '',
      mobileImageUrl: '',
      title: '',
      description: '',
    },
    artworks: [],
    galleryInfo: {
      title: '',
      subtitle: '',
      description: '',
      buttonText: '',
      imageUrl: '',
    },
    artworkCategories: [],
    filters: {
      styles: [],
      mediums: [],
      sizes: [],
      layouts: [],
    },
    whatsappMobileNumber: '',
    contact: '',
  };

  /**
   * 1. Convert artworks.csv
   */
  const artworksPath = path.join(dataSourceDir, 'artworks.csv');
  if (fs.existsSync(artworksPath)) {
    const artworksJson = await convertCSVToJSON(artworksPath);
    data.artworks = artworksJson.map((item) => ({
      id: Number(item.id),
      imageUrl: item.imageUrl,
      artist: item.artist,
      title: item.title,
      medium: item.medium,
      dimensions: item.dimensions,
      style: item.style,
      size: item.size,
      layout: item.layout,
    }));
    console.log(`Artworks loaded: ${data.artworks.length}`);
  } else {
    console.warn('artworks.csv not found.');
  }

  /**
   * 2. Convert artworkCategories.csv
   */
  const categoriesPath = path.join(dataSourceDir, 'artworkCategories.csv');
  if (fs.existsSync(categoriesPath)) {
    const categoriesJson = await convertCSVToJSON(categoriesPath);
    data.artworkCategories = categoriesJson.map((item) => ({
      title: item.title,
      count: Number(item.count),
    }));
    console.log(`Artwork Categories loaded: ${data.artworkCategories.length}`);
  } else {
    console.warn('artworkCategories.csv not found.');
  }

  /**
   * 3. Convert Filters CSVs
   */
  const filterFiles = [
    { filterType: 'styles', fileName: 'filters_styles.csv' },
    { filterType: 'mediums', fileName: 'filters_mediums.csv' },
    { filterType: 'sizes', fileName: 'filters_sizes.csv' },
    { filterType: 'layouts', fileName: 'filters_layouts.csv' },
  ];

  for (const filter of filterFiles) {
    const filterPath = path.join(dataSourceDir, filter.fileName);
    if (fs.existsSync(filterPath)) {
      const filterJson = await convertCSVToJSON(filterPath);
      const singularFilterType = filter.filterType.slice(0, -1); // e.g., 'styles' -> 'style'
      const values = filterJson.map((item) => item[singularFilterType] || '').filter(value => value !== '');
      data.filters[filter.filterType as keyof Filters] = values;
      console.log(`${filter.filterType} loaded: ${values.length}`);
    } else {
      console.warn(`${filter.fileName} not found.`);
    }
  }

  /**
   * 4. Convert heroSection.csv
   */
  const heroSectionPath = path.join(dataSourceDir, 'heroSection.csv');
  if (fs.existsSync(heroSectionPath)) {
    const heroSectionJson = await convertKeyValueCSVToObject(heroSectionPath);
    console.log('Raw Hero Section JSON:', heroSectionJson); // Debugging log

    data.heroSection.imageUrl = heroSectionJson.imageUrl || '';
    data.heroSection.mobileImageUrl = heroSectionJson.mobileImageUrl || '';
    data.heroSection.title = heroSectionJson.title || '';
    data.heroSection.description = heroSectionJson.description || '';

    console.log('Hero Section Assigned:', data.heroSection); // Debugging log
  } else {
    console.warn('heroSection.csv not found.');
  }

  /**
   * 5. Convert galleryInfo.csv
   */
  const galleryInfoPath = path.join(dataSourceDir, 'galleryInfo.csv');
  if (fs.existsSync(galleryInfoPath)) {
    const galleryInfoJson = await convertKeyValueCSVToObject(galleryInfoPath);
    console.log('Raw Gallery Info JSON:', galleryInfoJson); // Debugging log

    data.galleryInfo.title = galleryInfoJson.title || '';
    data.galleryInfo.subtitle = galleryInfoJson.subtitle || '';
    data.galleryInfo.description = galleryInfoJson.description || '';
    data.galleryInfo.buttonText = galleryInfoJson.buttonText || '';
    data.galleryInfo.imageUrl = galleryInfoJson.imageUrl || '';

    console.log('Gallery Info Assigned:', data.galleryInfo); // Debugging log
  } else {
    console.warn('galleryInfo.csv not found.');
  }

  /**
   * 6. Convert contactInfo.csv
   */
  const contactInfoPath = path.join(dataSourceDir, 'contactInfo.csv');
  if (fs.existsSync(contactInfoPath)) {
    const contactInfoJson = await convertKeyValueCSVToObject(contactInfoPath);
    console.log('Raw Contact Info JSON:', contactInfoJson); // Debugging log

    data.whatsappMobileNumber = contactInfoJson.whatsappMobileNumber || '';
    data.contact = contactInfoJson.contact || '';

    console.log('Contact Info Assigned:', {
      whatsappMobileNumber: data.whatsappMobileNumber,
      contact: data.contact,
    }); // Debugging log
  } else {
    console.warn('contactInfo.csv not found.');
  }

  /**
   * 7. Write to data.json
   */
  try {
    fs.writeFileSync(outputJsonPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('data.json has been updated successfully.');
  } catch (error) {
    console.error('Error writing data.json:', error);
  }
};

// Execute the build process
buildDataJson();
