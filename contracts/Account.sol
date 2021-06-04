// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;


contract projectGenerator {
    Project[] public deployedProjects;
    
    function createCampaign(string memory projectName, string memory projectDescription) public {
        Project newProject = new Project(msg.sender, projectName, projectDescription);
        deployedProjects.push(newProject);
    }
    
    function getDeployedCampaigns() public view returns (Project[] memory) {
        return deployedProjects;
    }
}

contract Project {
    
    struct Expense {
        string description;
        string category;
        uint256 amount;
        address payable vendor;
        bool paid;
    }
    
    struct Income {
        string description;
        string category;
        uint256 amount;
        address customer;
        bool paid;
    }
    
    Income[] public incomes;
    Expense[] public expenses;
    address public manager;
    string public projectName;
    string public projectDescription;
    
    constructor(address creator, string memory name, string memory description) public {
        manager = creator;
        projectName = name;
        projectDescription = description;
    }
    
    function addExpense(string memory description, string memory category, uint256 amount, address payable vendor) public {
        Expense memory expense = Expense({
            description: description,
            category: category,
            amount: amount,
            vendor: vendor,
            paid: false
            });
        expenses.push(expense);
    }
    
    function addIncome(string memory description, string memory category, uint256 amount) public {
        Income memory income = Income({
            description: description,
            category: category,
            amount: amount,
            customer: address(0),
            paid: false
            });
        incomes.push(income);
    }
    
    function payExpense(uint index) public restricted {
        Expense storage expense = expenses[index];
        
        expense.vendor.transfer(expense.amount);
        expense.paid = true;
    }
    
    function recieveIncome(uint index, address customer) public payable {
        Income storage income = incomes[index];
        
        income.customer = customer;
        income.paid = true;
    }

    function getIncomesCount() public view returns (uint) {
        return incomes.length;
    }


    function getExpensesCount() public view returns (uint) {
        return expenses.length;
    }

    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}








// // SPDX-License-Identifier: GPL-3.0

// pragma solidity >=0.4.22 <0.9.0;


// contract projectGenerator {
//     address[] public deployedProjects;
    
//     function createCampaign(uint minimum) public {
        
//         address newProject = new Project( msg.sender);
//         deployedProjects.push(newProject);
//     }
    
//     function getDeployedCampaigns() public view returns (address[] memory) {
//         return deployedProjects;
//     }
// }




// contract Project {
    
//     struct Expense {
//         string description;
//         string category;
//         uint256 amount;
//         address payable vendor;
//         bool paid;
//     }
    
//     struct Income {
//         string description;
//         string category;
//         uint256 amount;
//         address customer;
//         bool paid;
//     }
    
//     Income[] public incomes;
//     Expense[] public expenses;
//     uint public incomeTotal;
//     uint public expenseTotal;
//     address public manager;
    
//     constructor(uint minimum, address creator) public {
//         manager = creator;
//         m
//     }
    
//     function addExpense(string memory description, string memory category, uint256 amount, address payable vendor) public {
//         Expense memory expense = Expense({
//             description: description,
//             category: category,
//             amount: amount,
//             vendor: vendor,
//             paid: false
//             });
//         expenses.push(expense);
//     }
    
//     function addIncome(string memory description, string memory category, uint256 amount) public {
//         Income memory income = Income({
//             description: description,
//             category: category,
//             amount: amount,
//             customer: address(0),
//             paid: false
//             });
//         incomes.push(income);
//     }
    
//     function payExpense(uint index) public restricted {
//         Expense storage expense = expenses[index];
        
//         expense.vendor.transfer(expense.amount);
//         expense.paid = true;
//     }
    
//     function recieveIncome(uint index, address customer) public payable {
//         Income storage income = incomes[index];
        
//         income.customer = customer;
//         income.paid = true;
//     }

//     function getIncomesCount() public view returns (uint) {
//         return incomes.length;
//     }


//     function getExpensesCount() public view returns (uint) {
//         return expenses.length;
//     }

    
//     modifier restricted() {
//         require(msg.sender == manager);
//         _;
//     }
// }