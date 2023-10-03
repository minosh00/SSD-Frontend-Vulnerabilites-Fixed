import axios from "axios";
import { BASE_URL } from "../../../configs/Url.json";

let getAllSupplierURL = `${BASE_URL}/api/suppliers/`;
let getSupplierByIdURL = `${BASE_URL}/api/suppliers/`;
let updateSupplierByIDURL = `${BASE_URL}/api/suppliers/`;

export async function updateSupplierByID(id, data) {
  const alldata = {
    suppliername: data.suppliername,
    supplierCompanyName: data.supplierCompanyName,
    SupplyItemsname: data.SupplyItemsname,
    SupplyAmount: data.SupplyAmount,
    SupplyDate: data.SupplyDate,
    totalPrice: data.totalPrice,
  };

  return await axios.patch(updateSupplierByIDURL + id, alldata);
}

export async function getAllSupplier() {
  return await axios.get(getAllSupplierURL);
}

export async function getSupplierById(id) {
  return await axios.get(getSupplierByIdURL + id);
}
