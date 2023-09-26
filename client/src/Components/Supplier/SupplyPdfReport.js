import jsPDF from 'jspdf';
import "jspdf-autotable";

const SupplyPdfReport = Supplier => {

    const payDoc = new jsPDF();
    const tableColumn = ["Supplier Name", "Company Name", "Supply Item Name", "Supply Amount", "Supply Date", "Total Price"];
    const tableRows = [];

    Supplier.forEach(Supplier => {
        const transactionData = [
            Supplier.suppliername,
            Supplier.supplierCompanyName,
            Supplier.SupplyItemsname,
            Supplier.SupplyAmount,
            Supplier.SupplyDate,
            Supplier.totalPrice
        ];

        tableRows.push(transactionData);
    });

    payDoc.autoTable(tableColumn, tableRows, { startY: 20 });
    payDoc.text("All Suppliers Report", 14, 15);
    payDoc.save(`AllSuppliers.pdf`);
};

export default SupplyPdfReport;