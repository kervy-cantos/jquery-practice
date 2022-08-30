let tasksArray = [
  {
    id: 1,
    taskName: 'Computer Service',
    laborPrice: 0,
    partsPrice: 0,
    subTotal: 0,
    workers: [],
    parts: [],
    issues: []
  },
  {
    id: 2,
    taskName: 'Any',
    laborPrice: 0,
    partsPrice: 0,
    subTotal: 0,
    workers: [],
    parts: [],
    issues: []
  },
  {
    id: 3,
    taskName: 'Rental',
    laborPrice: 0,
    partsPrice: 0,
    subTotal: 0,
    workers: [],
    parts: [],
    issues: []
  },
];

$.each(tasksArray, function (key, value) {
  value.subTotal = value.laborPrice + value.partsPrice;
  $('#mainList').append(
    `<tr><td class="task-${value.id}">${value.taskName}<table><tbody id="added${value.id}"></tbody></table></td> 
    <td>
    <button type="button" onclick="workerModal(${value.id})" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#workerModal${value.id}">
    <i class="fa-solid fa-person"></i><span class="badge rounded-pill text-bg-success" id="laborCount${value.id}">${value.workers.length}</span></button>
    <button type="button" onclick="partsModal(${value.id})" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#partsModal${value.id}">
    <i class="fa-solid fa-gears"></i><span class="badge rounded-pill text-bg-danger" id="partsCount${value.id}">${value.parts.length}</span></button>
    <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#issuesModal${value.id}">
    <i class="fa-solid fa-circle-exclamation"></i><span class="badge rounded-pill text-bg-success" id="laborCount${value.id}">${value.issues.length}</span></button></td>
    <td class="lprice${value.id}">Labor Total:<br> ${value.laborPrice} $</td> 
    <td class="pprice${value.id}">Parts Total:<br> ${value.partsPrice} $</td> <td class="total${value.id}">Subtotal:<br> ${value.subTotal} $</td> 
    <td id="wDelete${value.id}"><i class="fa-solid fa-trash" onclick="deleteTask(${value.id})"></i></td>
   </tr>`
  );
  $(
    'body'
  ).append(`<div class="modal fade" id="workerModal${value.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Labor</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="taskLabor${value.id}">
            <label for="workerName${value.id}">Worker's Name</label>
            <input required class="form-control form-control-sm mb-2" type="text" placeholder="Worker Name" id="workerName${value.id}" name="workerName${value.id}" aria-label=".form-control-sm example" />
            <label for="workHours${value.id}">Work Hours</label>
            <input required class="form-control form-control-sm mb-2" type="number" min="1" placeholder="Work Hours" id="workHours${value.id}" name="workHours${value.id}" aria-label=".form-control-sm example" />
            <label for="workRate${value.id}">Salary Per Hour</label>
            <input required class="form-control form-control-sm mb-2" type="number" min="5" placeholder="Rate Per Hour" id="workRate${value.id}" name="workRate${value.id}" aria-label=".form-control-sm example" />
            <div class="d-block"><h3>Subtotal: </h3><span id="laborTotal${value.id}"></span></div> 
            <button type="submit" onclick="workerHandler(${value.id})" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> 
            </form>
           
        </div>
        <div class="modal-footer">
       
    </div>
  </div>
  </div>
  </div>
  <div class="modal fade" id="partsModal${value.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Parts</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="taskParts${value.id}" action="">
        <label for="partName${value.id}">Part Name</label>
          <input required class="form-control form-control-sm mb-2" type="text" id="partName${value.id}" name="partName${value.id}" placeholder="Parts Name" aria-label=".form-control-sm example" />
        <label for="quantity${value.id}">Quantity</label> 
          <input required class="form-control form-control-sm mb-2" type="number" id="quantity${value.id}" name="quantity${value.id}" min="1" placeholder="quantity" aria-label=".form-control-sm example" />
          <label for="partPrice${value.id}">Price ea</label>
          <input required  class="form-control form-control-sm mb-2" type="number" id="partPrice${value.id}" name="partPrice${value.id}" min="5" placeholder="Price per item" aria-label=".form-control-sm example" />
          <button type="submit" onclick="partsHandler(${value.id})" class="btn btn-primary">Add</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          
          <h3>Subtotal: </h3><span id="partsTotal${value.id}"></span>
          </form>
          
          </div>
        <div class="modal-footer">
          
      </div>
    </div>
  </div></div>
  <div class="modal fade" id="issuesModal${value.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Issue</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <textarea class="form-control"></textarea>
          <button class="btn btn-secondary mt-2">Submit</button>
        </form>
        <div class="modal-footer">
       <table><tbody id="issueList"></tbody></table>
      </div>
    </div>
  </div></div>
  `);
});
let taskId = tasksArray.length;
taskId = tasksArray[tasksArray.length - 1].id
taskId +=1
let taskObj = {};
$('#form1').on('keypress', function (e) {

  if (e.which == 13) {
    let taskId = tasksArray.length;
    taskId = tasksArray[tasksArray.length - 1].id
    taskId +=1
    let addedTask = $('#form1:input').val();
    taskObj = {
      taskName: addedTask,
      id: taskId,
      partsPrice: 0,
      laborPrice: 0,
      parts: [],
      workers: [],
      issues: [],
      subTotal: 0,
    };
    console.log(taskObj)
    tasksArray.push(taskObj);
    $('#mainList').append(
      `<tr><tdclass"task-${taskObj.id}"> <td>${taskObj.taskName}</td> 
    <td>
    <button type="button" onclick="workerModal(${taskObj.id})" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#workerModal${taskObj.id}">
    <i class="fa-solid fa-person"></i><span class="badge rounded-pill text-bg-success" id="laborCount${taskObj.id}">${taskObj.workers.length}</span></button>
    <button type="button" onclick="partsModal(${taskObj.id})" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#partsModal${taskObj.id}">
    <i class="fa-solid fa-gears"></i><span class="badge rounded-pill text-bg-danger" id="partsCount${taskObj.id}">${taskObj.parts.length}</span></button>
    <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#issuesModal${taskObj.id}">
    <i class="fa-solid fa-circle-exclamation"></i><span class="badge rounded-pill text-bg-success" id="laborCount${taskObj.id}">${taskObj.issues.length}</span></button></td>
    <td class="lprice${taskObj.id}">Labor Total:<br> ${taskObj.laborPrice} $ </td> 
    <td class="pprice${taskObj.id}">Parts Total:<br> ${taskObj.partsPrice} $</td> <td class="total${taskObj.id}">Subtotal:<br> ${taskObj.subTotal} $</td> 
    <td id="wDelete${taskObj.id}"><i class="fa-solid fa-trash" onclick="deleteTask(${taskObj.id})"></i></td>
   </tr>`
  );
  $(
    'body'
  ).append(`<div class="modal fade" id="workerModal${taskObj.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Labor</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="taskLabor${taskObj.id}">
            <label for="workerName${taskObj.id}">Worker's Name</label>
            <input required class="form-control form-control-sm mb-2" type="text" placeholder="Worker Name" id="workerName${taskObj.id}" name="workerName${taskObj.id}" aria-label=".form-control-sm example" />
            <label for="workHours${taskObj.id}">Work Hours</label>
            <input required class="form-control form-control-sm mb-2" type="number" min="1" placeholder="Work Hours" id="workHours${taskObj.id}" name="workHours${taskObj.id}" aria-label=".form-control-sm example" />
            <label for="workRate${taskObj.id}">Salary Per Hour</label>
            <input required class="form-control form-control-sm mb-2" type="number" min="5" placeholder="Rate Per Hour" id="workRate${taskObj.id}" name="workRate${taskObj.id}" aria-label=".form-control-sm example" />
            <div class="d-block"><h3>Subtotal: </h3><span id="laborTotal${taskObj.id}"></span></div> 
            <button type="submit" onclick="workerHandler(${taskObj.id})" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> 
            </form>
            <div><table><tbody id="workerList${taskObj.id}"></tbody></table></div>
        </div>
        <div class="modal-footer">
        <h2 id="wModalTotal${taskObj.id}">Total: ${taskObj.laborPrice}</h2>
    </div>
  </div>
  </div>
  </div>
  <div class="modal fade" id="partsModal${taskObj.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Parts</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="taskParts${taskObj.id}" action="">
        <label for="partName${taskObj.id}">Part Name</label>
          <input required class="form-control form-control-sm mb-2" type="text" id="partName${taskObj.id}" name="partName${taskObj.id}" placeholder="Parts Name" aria-label=".form-control-sm example" />
        <label for="quantity${taskObj.id}">Quantity</label> 
          <input required class="form-control form-control-sm mb-2" type="number" id="quantity${taskObj.id}" name="quantity${taskObj.id}" min="1" placeholder="quantity" aria-label=".form-control-sm example" />
          <label for="partPrice${taskObj.id}">Price ea</label>
          <input required  class="form-control form-control-sm mb-2" type="number" id="partPrice${taskObj.id}" name="partPrice${taskObj.id}" min="5" placeholder="Price per item" aria-label=".form-control-sm example" />
          <button type="submit" onclick="partsHandler(${taskObj.id})" class="btn btn-primary">Add</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </form>
          </div>
        <div class="modal-footer">
        
        <h3>Subtotal: </h3><span id="partsTotal${taskObj.id}"></span>
      </div>
    </div>
  </div></div>
  <div class="modal fade" id="issuesModal${taskObj.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Issue</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <textarea class="form-control"></textarea>
        </form>
        <div class="modal-footer">
       <table><tbody id="issueList"></tbody></table>
      </div>
    </div>
  </div></div>
  `);
  }
});
let total = 0;
for (let i = 0; i < tasksArray.length; i++) {
  total += tasksArray[i].subTotal;
}
$('#grandTotal').html(`${total}`);

const workerModal = (id) => {
  $(`#workHours${id}`).keyup(function () {
    let subtotal = $(this).val() * $(`#workRate${id}`).val();
    $(`#laborTotal${id}`).text(subtotal);
  });
  $(`#workRate${id}`).keyup(function () {
    let subtotal = $(this).val() * $(`#workHours${id}`).val();
    $(`#laborTotal${id}`).text(subtotal);
  });
};
const partsModal = (id) => {
  $(`#quantity${id}`).keyup(function () {
    let subtotal = $(this).val() * $(`#partPrice${id}`).val();
    $(`#partsTotal${id}`).text(subtotal);
  });
  $(`#partPrice${id}`).keyup(function () {
    let subtotal = $(this).val() * $(`#quantity${id}`).val();
    $(`#partsTotal${id}`).text(subtotal);
  });
};

const workerHandler = (id) => {
  $(`#taskLabor${id}`).submit(function (e) {
    let workerId = tasksArray[id-1].workers.length;
    workerId++
    console.log(workerId)
    let formValues = $(`#taskLabor${id}`).serializeArray();
    let workersTotal = formValues[1].value * formValues[2].value;
    let workerObj = {
      workerId: workerId,
      workerName: formValues[0].value,
      workHours: formValues[1].value,
      workRate: formValues[2].value,
      workersTotal: workersTotal,
    };

    tasksArray[id - 1].workers.push(workerObj);
    tasksArray[id - 1].laborPrice += workersTotal;
    tasksArray[id - 1].subTotal += workersTotal;
    console.log(tasksArray);
    console.log(tasksArray[id - 1].workers.length);
    $(`#laborCount${id}`).html(
      (parseInt($(`#laborCount${id}`).html(), 10) || 0) + 1
    );
    $(`.lprice${id}`).html(
      `Labor Total:<br>${tasksArray[id - 1].laborPrice} $`
    );
    $(`.laborTotal${id}`).html(
      `Subtotal:<br> ${tasksArray[id - 1].subTotal.toFixed(2)} $`
    );
    $(`.total${id}`).html(
      `Subtotal:<br> ${tasksArray[id - 1].subTotal.toFixed(2)} $`
    );
    $(`#added${id}`).append(`<tr><td id="lDelete${id}${workerObj.workerId}"><i class="fa-solid fa-person"></i></td><td>Name: ${workerObj.workerName}</td><td>Salary Total: ${workerObj.workersTotal} <i class="fa-solid fa-trash" onclick="deleteWorker(${id},${workerId})"></i></td></tr>`)
    
    let total = 0;
    for (let i = 0; i < tasksArray.length; i++) {
      total += tasksArray[i].subTotal;
    }
    
    $('.laborSubtotal').text(`${tasksArray[id-1].laborPrice}`);
    $('#grandTotal').html(`${total}`);
    e.preventDefault();
    e.stopImmediatePropagation();
  });
};

const partsHandler = (id) => {
  $(`#taskParts${id}`).submit(function (e) {
    let partId = tasksArray[id - 1].parts.length;
    partId++;
    let formValues = $(`#taskParts${id}`).serializeArray();
    let partsTotal = formValues[1].value * formValues[2].value;
    let partsObj = {
      partId: partId,
      partName: formValues[0].value,
      partQty: formValues[1].value,
      partPrice: formValues[2].value,
      partsTotal: partsTotal,
    };

    tasksArray[id - 1].parts.push(partsObj);
    tasksArray[id - 1].partsPrice += partsTotal;
    tasksArray[id - 1].subTotal += partsTotal;
    console.log(tasksArray);
    console.log(tasksArray[id - 1].parts.length);
    $(`#partsCount${id}`).html(
      (parseInt($(`#partsCount${id}`).html(), 10) || 0) + 1
    );
    $(`.pprice${id}`).html(
      `Parts Total:<br>${tasksArray[id - 1].partsPrice}`
    );
    $(`.total${id}`).html(
      `Subtotal:<br> ${tasksArray[id - 1].subTotal.toFixed(2)}`
    );
    $(`#added${id}`).append(`<tr><td id="pDelete${id}${partId}"><i class="fa-solid fa-gears"></i></td><td>Name: ${partsObj.partName}</td><td>Salary Total: ${partsObj.partsTotal} <i class="fa-solid fa-trash" onclick="deletePart(${id},${partsObj.partId})"></i></td><</tr>`)
    
    let total = 0;
    for (let i = 0; i < tasksArray.length; i++) {
      total += tasksArray[i].subTotal;
    }
    $('.partSubtotal').text(`${tasksArray[id-1].partsPrice}`);
    $('#grandTotal').html(`${total}`);
    e.preventDefault();
    e.stopImmediatePropagation();
  });
};


const deleteTask =(id)=>{
   let newTotal =  parseInt($('#grandTotal').html())
   let newLabor = parseInt($('#laborSubtotal').html())
   let newParts = parseInt($('#partSubtotal').html())

   newTotal -= tasksArray[id-1].subTotal
   newLabor -= tasksArray[id-1].laborPrice
   newParts -= tasksArray[id-1].partsPrice
   $('.partSubtotal').html(newParts);
   $('.laborSubtotal').html(newLabor);
  
   $('#grandTotal').html(newTotal)
    $(`#wDelete${id}`).closest('tr').remove()
}
const deleteWorker = (taskId, workerId)=>{
  
    let newTotal =  parseInt($('#grandTotal').html())
    newTotal -= tasksArray[taskId-1].workers[workerId-1].workersTotal
    tasksArray[taskId-1].laborPrice = tasksArray[taskId-1].laborPrice - tasksArray[taskId-1].workers[workerId-1].workersTotal
    $(`#laborCount${taskId}`).html(
      (parseInt($(`#laborCount${taskId}`).html(), 10) || 0)-1)
      $(`.lprice${taskId}`).html(
        `Labor Total:<br>${tasksArray[taskId - 1].laborPrice} $`
      );
      $('.laborSubtotal').html(tasksArray[taskId-1].laborPrice)
      $(`.total${taskId}`).html(
        `Subtotal:<br> ${newTotal} $`
      );
      $('#grandTotal').html(newTotal)
    $(`#lDelete${taskId}${workerId}`).closest('tr').remove()
}
const deletePart = (taskId, partId)=>{
  let newParts = parseInt($('#partSubTotal').html())
  let newTotal =  parseInt($('#grandTotal').html())
  tasksArray[taskId-1].partsPrice = tasksArray[taskId-1].partsPrice - tasksArray[taskId-1].parts[partId-1].partsTotal
  newTotal -= tasksArray[taskId-1].parts[partId-1].partsTotal
  $(`.pprice${taskId}`).html(
    `Parts Total:<br>${tasksArray[taskId - 1].partsPrice} $`
  );
  $(`#partsCount${taskId}`).html(
    (parseInt($(`#partsCount${taskId}`).html(), 10) || 0) -1
  )
  $(`#pDelete${taskId}${partId}`).closest('tr').remove()
  $('.partSubtotal').html(tasksArray[taskId-1].partsPrice);
  $('#grandTotal').html(newTotal)
}