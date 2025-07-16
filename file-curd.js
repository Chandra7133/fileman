const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const createFolder = async (folderPath) => {
 try {
  await fs.promises.mkdir(folderPath, { recursive: true });
  return true;
 } catch (err) {
  console.error('Create Folder Error:', err);
  return false;
 }
};

const createFile = async (filePath) => {
 try {
  const ext = path.extname(filePath);
  if (ext === '.txt') {
   await fs.promises.writeFile(filePath, '');
  } else if (ext === '.xlsx') {
   const workbook = XLSX.utils.book_new();
   const worksheet = XLSX.utils.aoa_to_sheet([['']]);
   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
   XLSX.writeFile(workbook, filePath);
  } else {
   throw new Error('Unsupported file type');
  }
  return true;
 } catch (err) {
  console.error('Create File Error:', err);
  return false;
 }
};

const readTextFile = async (filePath) => {
 try {
  const content = await fs.promises.readFile(filePath, 'utf-8');
  return content;
 } catch (err) {
  console.error('Read File Error:', err);
  throw err;
 }
};

const writeTextFile = async (filePath, content) => {
 try {
  await fs.promises.writeFile(filePath, content, 'utf-8');
  return true;
 } catch (err) {
  console.error('Write File Error:', err);
  return false;
 }
};

const readExcelData = (filePath) => {
 if (!fs.existsSync(filePath)) return [];
 const workbook = XLSX.readFile(filePath);
 const sheetName = workbook.SheetNames[0];
 const sheet = workbook.Sheets[sheetName];
 return XLSX.utils.sheet_to_json(sheet);
};

const createExcelRecord = (filePath, newItem) => {
 const data = readExcelData(filePath);
 newItem.id = Date.now();
 data.push(newItem);
 writeExcelData(filePath, data);
 return newItem;
};

const updateExcelRecord = (filePath, id, updatedItem) => {
 let data = readExcelData(filePath);
 const index = data.findIndex((item) => item.id === id);
 if (index === -1) return null;
 data[index] = { ...data[index], ...updatedItem };
 writeExcelData(filePath, data);
 return data[index];
};

const removeExcelRecord = (filePath, id) => {
 let data = readExcelData(filePath);
 const newData = data.filter((item) => item.id !== id);
 writeExcelData(filePath, newData);
 return true;
};

const writeExcelData = (filePath, data) => {
 const wb = XLSX.utils.book_new();
 const ws = XLSX.utils.json_to_sheet(data);
 XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 XLSX.writeFile(wb, filePath);
};

module.exports = {
 createFolder, createFile, readTextFile, writeTextFile, readExcelData, createExcelRecord,
 updateExcelRecord, removeExcelRecord
}