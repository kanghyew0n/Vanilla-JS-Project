const getItem = (e) => document.querySelector(e);
const getAllItem = (e) => document.querySelectorAll(e);

const $stationList = getItem("#stationList");
const $stationName = getItem("#stationName");
const $stationAddButton = getItem("#stationAddButton");

let stationArr = [];

const addTableRow = () => {
    const newRow = $stationList.insertRow();
    stationArr.forEach((element, idx) => {
        newRow.innerHTML = `
            <td>${element}</td>
            <td><button class="delete" id=${idx}>삭제</button></td>
    `;
    });
};

const validationCheck = () => {
    if ($stationName.value.length < 2) {
        $stationName.value = "";
        return alert("2글자 이상 입력해주세요.");
    } else if (stationArr.includes($stationName.value)) {
        $stationName.value = "";
        return alert("이미 존재하는 역입니다.");
    } else {
        addStationName();
    }
};

const addStationName = () => {
    stationArr.push($stationName.value);
    $stationName.value = "";
    addTableRow();
    return $stationName.value;
};

$stationAddButton.addEventListener("click", () => {
    validationCheck();
});



$stationList.addEventListener("click", () => {
    const $delete = getAllItem(".delete");
    $delete.forEach((item) => {
        item.addEventListener("click", () => {
            console.log(item)
        });
    });
});

