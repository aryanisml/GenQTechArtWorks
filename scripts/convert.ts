// scripts/convert.ts

import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

/**
 * Interface Definitions
 */

interface DataJson {
  heroSection: HeroSection;
  artworks: Artwork[];
  galleryInfo: GalleryInfo;
  artworkCategories: ArtworkCategory[];
  filters: Filters;
  whatsappMobileNumber: string;
  contact: string;
}

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

interface ArtworkCategory {
  title: string;
  count: number;
}

interface Filters {
  styles: string[];
  mediums: string[];
  sizes: string[];
  layouts: string[];
}

interface HeroSection {
  imageUrl: string;
  mobileImageUrl: string;
  title: string;
  description: string;
}

interface GalleryInfo {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  imageUrl: string;
}

interface ContactInfo {
  whatsappMobileNumber: string;
  contact: string;
}

/**
 * Paths Configuration
 */

// Use process.cwd() to ensure paths are relative to the project root,
// regardless of where the script is executed from.
const dataSourceDir = path.join(process.cwd(), 'data-source');
const publicDir = path.join(process.cwd(), 'public');
const outputJsonPath = path.join(publicDir, 'data.json');

/**
 * Utility Functions
 */

/**
 * Converts a standard CSV file to a JSON array.
 * @param filePath - The path to the CSV file.
 * @returns A promise that resolves to an array of records.
 */
const convertCSVToJSON = async (filePath: string): Promise<Record<string, string>[]> => {
  try {
    const jsonArray: Record<string, string>[] = await csv().fromFile(filePath);
    return jsonArray;
  } catch (error) {
    console.error(`Error converting ${filePath} to JSON:`, error);
    return [];
  }
};

/**
 * Converts a key-value CSV file to a single object.
 * Assumes the CSV has 'key' and 'value' columns.
 * @param filePath - The path to the key-value CSV file.
 * @returns A promise that resolves to an object mapping keys to values.
 */
const convertKeyValueCSVToObject = async (filePath: string): Promise<Record<string, string>> => {
  try {
    const jsonArray: Record<string, string>[] = await csv().fromFile(filePath);
    const obj: Record<string, string> = {};
    jsonArray.forEach((item: Record<string, string>) => {
      const key = item.key?.trim();
      const value = item.value?.trim();
      if (key && value) {
        obj[key] = value;
      }
    });
    return obj;
  } catch (error) {
    console.error(`Error converting ${filePath} to Object:`, error);
    return {};
  }
};

/**
 * Validation Functions
 */

/**
 * Checks if a directory exists and is indeed a directory.
 * @param dirPath - The path to the directory.
 * @returns True if the directory exists, false otherwise.
 */
const directoryExists = (dirPath: string): boolean => {
  return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
};

/**
 * Checks if a file exists and is indeed a file.
 * @param filePath - The path to the file.
 * @returns True if the file exists, false otherwise.
 */
const fileExists = (filePath: string): boolean => {
  return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();
};

/**
 * Checks the existence of all required CSV files.
 * @param files - An array of CSV file names to check.
 * @returns True if all files exist, false otherwise.
 */
const checkCSVFilesExist = (files: string[]): boolean => {
  let allExist = true;
  files.forEach((file) => {
    const filePath = path.join(dataSourceDir, file);
    if (!fileExists(filePath)) {
      console.error(`Error: ${file} does not exist in data-source directory.`);
      allExist = false;
    }
  });
  return allExist;
};

/**
 * Main Function to Build data.json
 */

const buildDataJson = async () => {
  // 1. Verify data-source directory exists
  if (!directoryExists(dataSourceDir)) {
    console.error(`Error: data-source directory not found at ${dataSourceDir}`);
    process.exit(1);
  }

  // 2. Define required CSV files
  const requiredCSVFiles = [
    'artworks.csv',
    'artworkCategories.csv',
    'filters_styles.csv',
    'filters_mediums.csv',
    'filters_sizes.csv',
    'filters_layouts.csv',
    'heroSection.csv',
    'galleryInfo.csv',
    'contactInfo.csv'
  ];

  // 3. Check if all required CSV files exist
  if (!checkCSVFilesExist(requiredCSVFiles)) {
    console.error('One or more required CSV files are missing. Aborting data conversion.');
    process.exit(1);
  }

  // 4. Ensure public directory exists; create it if not
  if (!directoryExists(publicDir)) {
    try {
      fs.mkdirSync(publicDir, { recursive: true });
      console.log('Created public directory.');
    } catch (error) {
      console.error('Error creating public directory:', error);
      process.exit(1);
    }
  }

  // 5. Initialize the data object
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
   * 6. Process each CSV file and populate the data object
   */

  // 6.1. Convert artworks.csv
  const artworksPath = path.join(dataSourceDir, 'artworks.csv');
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

  // 6.2. Convert artworkCategories.csv
  const categoriesPath = path.join(dataSourceDir, 'artworkCategories.csv');
  const categoriesJson = await convertCSVToJSON(categoriesPath);
  data.artworkCategories = categoriesJson.map((item) => ({
    title: item.title,
    count: Number(item.count),
  }));
  console.log(`Artwork Categories loaded: ${data.artworkCategories.length}`);

  // 6.3. Convert Filters CSVs
  const filterFiles = [
    { filterType: 'styles', fileName: 'filters_styles.csv' },
    { filterType: 'mediums', fileName: 'filters_mediums.csv' },
    { filterType: 'sizes', fileName: 'filters_sizes.csv' },
    { filterType: 'layouts', fileName: 'filters_layouts.csv' },
  ];

  for (const filter of filterFiles) {
    const filterPath = path.join(dataSourceDir, filter.fileName);
    const filterJson = await convertCSVToJSON(filterPath);
    const singularFilterType = filter.filterType.slice(0, -1); // e.g., 'styles' -> 'style'
    const values = filterJson.map((item) => item[singularFilterType] || '').filter((value) => value !== '');
    data.filters[filter.filterType as keyof Filters] = values;
    console.log(`${filter.filterType} loaded: ${values.length}`);
  }

  // 6.4. Convert heroSection.csv
  const heroSectionPath = path.join(dataSourceDir, 'heroSection.csv');
  const heroSectionJson = await convertKeyValueCSVToObject(heroSectionPath);
  console.log('Raw Hero Section JSON:', heroSectionJson);

  data.heroSection.imageUrl = heroSectionJson.imageUrl || '';
  data.heroSection.mobileImageUrl = heroSectionJson.mobileImageUrl || '';
  data.heroSection.title = heroSectionJson.title || '';
  data.heroSection.description = heroSectionJson.description || '';

  console.log('Hero Section Assigned:', data.heroSection);

  // 6.5. Convert galleryInfo.csv
  const galleryInfoPath = path.join(dataSourceDir, 'galleryInfo.csv');
  const galleryInfoJson = await convertKeyValueCSVToObject(galleryInfoPath);
  console.log('Raw Gallery Info JSON:', galleryInfoJson);

  data.galleryInfo.title = galleryInfoJson.title || '';
  data.galleryInfo.subtitle = galleryInfoJson.subtitle || '';
  data.galleryInfo.description = galleryInfoJson.description || '';
  data.galleryInfo.buttonText = galleryInfoJson.buttonText || '';
  data.galleryInfo.imageUrl = galleryInfoJson.imageUrl || '';

  console.log('Gallery Info Assigned:', data.galleryInfo);

  // 6.6. Convert contactInfo.csv
  const contactInfoPath = path.join(dataSourceDir, 'contactInfo.csv');
  const contactInfoJson = await convertKeyValueCSVToObject(contactInfoPath);
  console.log('Raw Contact Info JSON:', contactInfoJson);

  data.whatsappMobileNumber = contactInfoJson.whatsappMobileNumber || '';
  data.contact = contactInfoJson.contact || '';

  console.log('Contact Info Assigned:', {
    whatsappMobileNumber: data.whatsappMobileNumber,
    contact: data.contact,
  });

  /**
   * 7. Write the data object to data.json
   */
  try {
    fs.writeFileSync(outputJsonPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('data.json has been updated successfully.');
  } catch (error) {
    console.error('Error writing data.json:', error);
    process.exit(1);
  }
};

// Execute the build process
buildDataJson();
