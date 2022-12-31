const getItem = (e) => document.querySelector(e);

const $stationList = getItem("#stationList");
const $stationName = getItem("#stationName");
const $stationAddButton = getItem("#stationAddButton");
const $delete = getItem(".delete");

const stationArr = [];

const addTableRow = () => {
    const newRow = $stationList.insertRow();
    stationArr.forEach((element) => {
        newRow.innerHTML = `
            <td>${element}</td>
            <td><button class="delete">삭제</button></td>
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

export { addStationName };
