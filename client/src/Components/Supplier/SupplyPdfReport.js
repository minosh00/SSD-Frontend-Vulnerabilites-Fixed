import jsPDF from 'jspdf';
import "jspdf-autotable";

const SupplyPdfReport = Supplier => {

    const payDoc = new jsPDF();

    const tableColumn = ["Name", "E-mail Address", "Supplier Name", "Check-in date", "Check-out date", "Total Days"];
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