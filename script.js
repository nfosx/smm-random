document.addEventListener("DOMContentLoaded", function() {
    const pickButton = document.getElementById("pickButton");
    const randomItem = document.getElementById("randomItem");
    const pickedNumber = document.getElementById("pickedNumber");
    const historyTable = document.getElementById("historyTable");
    
    let items = JSON.parse(localStorage.getItem("leftoverItems")) || [
        { name: "A01", quantity: 1 },
        { name: "A02", quantity: 4 },
        { name: "A03", quantity: 8 },
        { name: "A04", quantity: 1 },
        { name: "A05", quantity: 1 },
        { name: "A06", quantity: 2 },
        { name: "A07", quantity: 162 },
        { name: "A08", quantity: 1 },
        { name: "A09", quantity: 1 },
        { name: "A10", quantity: 1 },
        { name: "A11", quantity: 1 },
        { name: "A12", quantity: 10 },
        { name: "A13", quantity: 20 },
        { name: "A14", quantity: 1 },
        { name: "A15", quantity: 1 },
        { name: "A16", quantity: 2 },
        { name: "A17", quantity: 1 },
        { name: "A19", quantity: 1 },
        { name: "A20", quantity: 4 },
        { name: "A21", quantity: 1 },
        { name: "A22", quantity: 1 },
        { name: "A23", quantity: 1 },
        { name: "A24", quantity: 1 },
        { name: "A25", quantity: 123 },
        { name: "A26", quantity: 1 },
        { name: "A27", quantity: 4 },
        { name: "A28", quantity: 1 },
        { name: "A29", quantity: 4 },
        { name: "A30", quantity: 1 },
        { name: "A31", quantity: 3 },
        { name: "A32", quantity: 3 },
        { name: "A33", quantity: 1 },
        { name: "A34", quantity: 100 },
        { name: "A35", quantity: 242 },
        { name: "A36", quantity: 1 },
        { name: "A37", quantity: 2 },
        { name: "A38", quantity: 1 },
        { name: "A39", quantity: 1 },
        { name: "A40", quantity: 1 },
        { name: "A41", quantity: 1 },
        { name: "A42", quantity: 1 },
        { name: "A43", quantity: 21 },
        { name: "A44", quantity: 1 },
        { name: "A45", quantity: 1 },
        { name: "A46", quantity: 1 },
        { name: "A47", quantity: 4 },
        { name: "A48 น้ำมันเครื่อง", quantity: 24 },
      // Add more items here
    ];
    let history = JSON.parse(localStorage.getItem("pickedHistory")) || [];
    let totalPicked = 0;
  
    function updateLocalStorageAndUI() {
      localStorage.setItem("leftoverItems", JSON.stringify(items));
      localStorage.setItem("pickedHistory", JSON.stringify(history));
      
      const leftoverTable = document.getElementById("leftoverTable");
      items.forEach((item, index) => {
        const quantityCell = leftoverTable.querySelector(`tr:nth-child(${index + 2}) td:nth-child(2)`);
        if (quantityCell) {
          quantityCell.textContent = item.quantity;
        }
      });
  
      pickedNumber.textContent = `Picked Number: ${totalPicked}`;
    }
  
    function addToHistory(itemName) {
      history.unshift({ name: itemName, pickedAt: new Date().toLocaleString() });
      while (history.length > 10) {
        history.pop();
      }
      updateHistoryTable();
    }
  
    function updateHistoryTable() {
      historyTable.innerHTML = `
        <tr>
          <th>Item</th>
          <th>Picked At</th>
        </tr>
        ${history.map(item => `
          <tr>
            <td>${item.name}</td>
            <td>${item.pickedAt}</td>
          </tr>
        `).join("")}
      `;
    }
  
    updateLocalStorageAndUI();
    updateHistoryTable();
  
    pickButton.addEventListener("click", function() {
      const availableItems = items.filter(item => item.quantity > 0);
  
      if (availableItems.length === 0) {
        alert("No more items left!");
        return;
      }
  
      const randomIndex = Math.floor(Math.random() * availableItems.length);
      const selectedItem = availableItems[randomIndex];
      
      randomItem.textContent = "Random Item: " + selectedItem.name;
      selectedItem.quantity--;
      totalPicked++;
      addToHistory(selectedItem.name);
      updateLocalStorageAndUI();
  
      console.log("Leftover Items:");
      items.forEach(item => {
        console.log(`${item.name}: ${item.quantity}`);
      });
    });
  });
  