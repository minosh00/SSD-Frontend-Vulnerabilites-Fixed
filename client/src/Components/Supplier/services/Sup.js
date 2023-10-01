import axios from "axios";
import { StartUrl } from "../../../configs/Url.json";

let getAllSupplierURL = `${StartUrl}api/suppliers/`;
let getSupplierByIdURL = `${StartUrl}api/suppliers/`;
let updateSupplierByIDURL = `${StartUrl}api/suppliers/`;

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
