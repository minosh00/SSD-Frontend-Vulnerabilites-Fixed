import jsPDF from 'jspdf';
import "jspdf-autotable";

const MenuReport = users => {

    const payDoc = new jsPDF();

    const tableColumn = ["Food Name", "Description", "Price (LKR)"];
    const tableRows = [];

    users.forEach(users => {
        const transactionData = [
            users.name,
            users.description,
            users.price
        ];
        
        tableRows.push(transactionData);
    });

    payDoc.autoTable(tableColumn, tableRows, { startY: 20 });
    payDoc.text("All Menu Report", 14, 15);
    payDoc.save(`Menu.pdf`);
};

export default MenuReport;