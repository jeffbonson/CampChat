function filterFunction(entity,thisItem) 
{
	/*Search the Drop-Down-list*/
    var input, filter, ul, li, a, i;
    //input = $("#myInput-"+entity).val();
	input = $(thisItem).val();
	filter = input.toUpperCase();
    div = $(".dropdown-content-"+entity);
	
	 $(".dropdown-content-"+entity).find(".row .name").each(function(a)
	 {
	 	if($(this).text().toUpperCase().indexOf(filter) > -1)
		{
			$(this).parent().show();
		}
		else
		{
			$(this).parent().hide();
		}
	 });
}

function index_filter()
{
	/*Sales select customer form submit*/
	var html_dummy_data = dummy_list();
	$(".list-form").html(html_dummy_data);
	$(".filter_form").submit();
}


$(document).on('click', '.auto_complete .results .row', function(e)
{ 
	/*Selecting a item from the drop-down-list*/
	
	var thisContainer = $(this);
	var resposne_action = thisContainer.parent().parent().parent().parent();
	
	//alert(resposne_action.attr("class"))
	
	if(resposne_action.hasClass("filter"))
  	{
		default_ddlb_select_action(thisContainer);
		index_filter();
	}
	
	else if(resposne_action.hasClass("bill-customer-to-sales"))
	{
		var response_url = resposne_action.attr("data-response");
		var ddbl_selected_items = get_selected_ddlb_item_details(thisContainer,"bill-customer-to-sales");
		$.get(response_url, { item: ddbl_selected_items});
	}
	
	else if(resposne_action.hasClass("bill-vendor-to-purchases"))
	{
		var response_url = resposne_action.attr("data-response");
		var ddbl_selected_items = get_selected_ddlb_item_details(thisContainer,"bill-vendor-to-purchases");
		$.get(response_url, { item: ddbl_selected_items});
	}
	
	else if(resposne_action.hasClass("bill-item-purchases"))
	{
		var response_url = resposne_action.attr("data-response");
		var vendor_id = $("#vendor_id").val()
		if(vendor_id)
		{
			
			default_ddlb_select_action(thisContainer);
			assign_item_description(thisContainer,resposne_action,response_url,"purchases");	
			
		}	
		else
		{
			$.get("/purchases/select_vendor_notification")
		}
		
		
		
	}
	
	else if(resposne_action.hasClass("bill-item-sales"))
	{
		
		var response_url = resposne_action.attr("data-response");
		default_ddlb_select_action(thisContainer);
		assign_item_description(thisContainer,resposne_action,response_url,"sales");
		
	}
	
	else if(resposne_action.hasClass("bill-item-orders"))
	{
		
		
		var response_url = resposne_action.attr("data-response");
		default_ddlb_select_action(thisContainer);
		assign_item_description(thisContainer,resposne_action,response_url,"orders");
		
	}
	
	
	
	else if(resposne_action.hasClass("bill-additional-charges"))
	{
		default_ddlb_select_action(thisContainer);
		assign_additional_charges(thisContainer,resposne_action);
	}
	
	else if(resposne_action.hasClass("bill-item-payments"))
	{
		var response_url = resposne_action.attr("data-response");
		default_ddlb_select_action(thisContainer);
		transaction_type = thisContainer.parent().parent().parent().parent().parent().parent();
		
		if(transaction_type.hasClass("transaction_type_1"))
		{
			//Purchases
			assign_item_description(thisContainer,resposne_action,response_url,"payments");
			
		}
		else if(transaction_type.hasClass("transaction_type_2"))
		{
			//Sales
			assign_old_gold_item_dummy(thisContainer,resposne_action,response_url,"payments");
		}
		else if(transaction_type.hasClass("transaction_type_3"))
		{
			//Orders
			assign_old_gold_item_dummy(thisContainer,resposne_action,response_url,"payments");
		}
		
		
	}
	
	else if(resposne_action.hasClass("Expenses"))
	{
		default_ddlb_select_action(thisContainer);
		assign_expense_description(thisContainer,resposne_action);
	}
	
	else 
		if (resposne_action.hasClass("des")) {
			var previous_item_id = thisContainer.parent().parent().parent().parent().find(".selected_item_id").val();
			default_ddlb_select_action(thisContainer);
			var response_url = resposne_action.attr("data-response");
			
			var module_type = resposne_action.parent().attr("data-transaction-module")
			
			transaction_type_parent = thisContainer.parent().parent().parent().parent().parent().parent().parent().parent();
			
			
			if (transaction_type_parent.hasClass("transaction_type_1")) 
			{
				transaction_type = "purchases"
			}
			else if (transaction_type_parent.hasClass("transaction_type_2")) 
			{
				transaction_type = "sales"
				
			}
			else if (transaction_type_parent.hasClass("transaction_type_3")) 
			{
				transaction_type = "orders"
			}
			
			assign_item_weight_purity(thisContainer, resposne_action, response_url, transaction_type, previous_item_id, module_type);
			
		}
		
		else 
			if (resposne_action.hasClass("user-roles")) {
				default_ddlb_select_action(thisContainer);
			}
			
			else 
				if (resposne_action.hasClass("admin-additional-charges")) {
					default_ddlb_select_action(thisContainer);
				}
				
				else 
					if (resposne_action.hasClass("admin-investors")) {
						default_ddlb_select_action(thisContainer);
					}
	
	
});

$(document).on('click', 'html', function(e)
{
	/*Opening a Drop-down-list*/
	
	var target = $(e.target);
	
	if (target.is('.input-select-field')) 
	{
		open_ddlb_list(target);
	}
	
	else if (target.is('.fa-chevron-down')) 
	{
		open_ddlb_list(target.parent());
	}
	
	else if (target.is('.auto_complete_input_box')) 
	{
		//alert('click on auto-complete input-box')
	}
		
	else if (target.is('.remove-ddl-selected')) 
	{
		// Removing the selected Item from Drop-Down-List
		
		var responseAction = $(e.target).parent().parent();
		
		//alert(responseAction.attr("class"))
		
		$(".dropdown-content").hide();
		
		responseAction.children().find(".dropdown-content").show();
		
		if(responseAction.hasClass("filter"))
		{
			default_ddlb_deselect_action(e.target);
			index_filter();
		}
		
		else if(responseAction.hasClass("bill-item-purchases"))
		{
			category_id_item_id = remove_selected_category(e.target);
			category_id = category_id_item_id[0]
			item_id = category_id_item_id[1]
			default_ddlb_deselect_action(e.target);
			deselect_purchase_item_description(responseAction);
			remove_selected_item_from_session(item_id,category_id,"","");
			
		}
		
		else if(responseAction.hasClass("bill-item-sales"))
		{
			remove_selected_category(e.target);
			default_ddlb_deselect_action(e.target);
			deselect_item_description(responseAction)
			
		}
		
		else if(responseAction.hasClass("bill-item-orders"))
		{
			category_id_item_id = remove_selected_category(e.target);
			category_id = category_id_item_id[0]
			item_id = category_id_item_id[1]
			default_ddlb_deselect_action(e.target);
			deselect_order_item_description(responseAction)
			module = responseAction.parent().attr("data-transaction-module");
			remove_selected_item_from_session(item_id,category_id,"",module);
			
		}
		
		else if(responseAction.hasClass("bill-item-payments"))
		{
			category_id_item_id = remove_selected_category(e.target);
			category_id = category_id_item_id[0];
			item_id = category_id_item_id[1];
			default_ddlb_deselect_action(e.target);
			deselect_payment_item_description(responseAction)
			module = responseAction.parent().attr("data-transaction-module");
			remove_selected_item_from_session(item_id,category_id,"",module);
			
			
		}
		
		else if(responseAction.hasClass("des"))
		{
			var transaction_type_id = $(e.target).parent().parent().parent().attr("data-transaction_type_id");
			category_id,item_id = remove_selected_item(e.target);
			default_ddlb_deselect_action(e.target);
			remove_weight_purity(responseAction);
			module = responseAction.parent().attr("data-transaction-module");
			item_count = responseAction.parent().attr("data-item_count");
			remove_selected_item_from_session(item_id,category_id,transaction_type_id,module,item_count);
		}
		
		else if(responseAction.hasClass("bill-additional-charges"))
		{
			remove_selected_additional_charges(e.target);
			default_ddlb_deselect_action(e.target);
		}
		
		else if(responseAction.hasClass("Expenses"))
		{
			remove_selected_expense(e.target);
			default_ddlb_deselect_action(e.target);
		}
		
		else if(responseAction.hasClass("admin-additional-charges"))
		{
			remove_selected_admin_additional_charge(e.target);
			default_ddlb_deselect_action(e.target);
		}
		
		else
		{
			default_ddlb_deselect_action(e.target);
		}
	}
	else
	{
		$(".dropdown-content").hide();
	}
});


function get_selected_ddlb_item_details(thisContainer,ddlb_type)
{
	var selected_ddlb_content = []
	
	switch(ddlb_type) 
	{
	    case "default":
	        selected_ddlb_content = ddlb_default_action(thisContainer)
	        break;
	    
		case "category":
	         selected_ddlb_content = ddlb_default_action(thisContainer)
	        break;
			
		case "item":
	         selected_ddlb_content = ddlb_item_action(thisContainer)
	        break;
			
		case "old_item":
	         selected_ddlb_content = ddlb_default_action(thisContainer)
	        break;
			
	    default:
	        selected_ddlb_content = ddlb_default_action(thisContainer)
	}

	return selected_ddlb_content; 
	
}

function ddlb_default_action(thisContainer)
{
	var name = thisContainer.find(".name").text();
	var description = thisContainer.find(".contact").text();
	var entity_id = thisContainer.attr("data-entityid");
	var entity_type = thisContainer.parent().attr("data-entity");
	return [name,description,entity_id,entity_type]
}

function ddlb_item_action(thisContainer)
{
	var name = thisContainer.find(".name").text();
	var description = thisContainer.find(".contact").text();
	var entity_id = thisContainer.attr("data-entityid");
	var entity_type = thisContainer.parent().attr("data-entity");
	
	var weight = thisContainer.attr("data-weight");
	var purity = thisContainer.attr("data-purity");
	var kilobar_rate = thisContainer.attr("data-kilobarrate");
	
	return [name,description,entity_id,entity_type,weight,purity,kilobar_rate]
}

function default_ddlb_select_action(thisContainer)
{
	var ddbl_selected_items = get_selected_ddlb_item_details(thisContainer,"default");
	var parent = thisContainer.parent().parent().parent().parent();
	var name = ddbl_selected_items[0];
	var description =  ddbl_selected_items[1];
	var entity_id =  ddbl_selected_items[2];
	var entity_type =  ddbl_selected_items[3];
	parent.find(".selected_item_id").val(entity_id);
	
  	var selectedString = name+" <span class='fa fa-times remove-ddl-selected select-icon' data-entity='"+entity_type+"'></span>";
	parentContainer = thisContainer.parent().parent().parent().parent().parent();
	
  	assign = parentContainer.find("#input-select-field-"+entity_type);
	
  	assign.html(selectedString);
  	assign.addClass("selected_ddlb");
  	thisContainer.parent().parent().hide();
}


function default_ddlb_deselect_action(thisContainer)
{
	
	var entity_type = $(thisContainer).attr("data-entity");
	$(thisContainer).parent().parent().find(".selected_item_id").val("")
	assign =  $(thisContainer).parent().parent().find("#input-select-field-"+entity_type);
	assign.removeClass("selected_ddlb");
	var selectedString = entity_type+" <span class='fa fa-chevron-down select-icon'></span>";
	assign.html(selectedString);
	
	
	
	
}

function open_ddlb_list(target)
{
	$(".dropdown-content").not(target.parent().children().find(".dropdown-content")).hide();
		
	 var entity = target.attr("data-entity");
	 
	 if (entity == "Categories") 
	 {
	 	already_selected_item_id = target.parent().find(".selected_item_id").val()
		if(already_selected_item_id)
		{
			target.parent().find(".auto_complete_container .auto_complete .results .row").show();
			target.parent().find(".auto_complete_container .auto_complete .results #category_row_"+already_selected_item_id).hide();
			
			item_id = target.parent().parent().find(".item_info .existing_item_info .des .selected_item_id").val()
			if (item_id) 
			{
				remove_item_from_session_url = "/items/remove_selected_item_from_session"
				$.get(remove_item_from_session_url, 
				{
					item_id: item_id
				});
			}
			
		}
		else
		{
			target.parent().find(".auto_complete_container .auto_complete .results .row").show();
		}
		
	 }
 
	 var container_width = target.width();
	 
	 var parentContainer = target.parent();
	 
	 parentContainer.find(".auto_complete_container .auto_complete").toggle();
	 
	 parentContainer.find(".auto_complete_container .auto_complete .row .textbox input").val('');
	 
	 $(".dropdown-content-"+entity).width(container_width + 20);
	 
	 if (parentContainer.hasClass('add-business-contact'))
	 {
	 	$(".new_business-contact-row").show();
	 }
	 else
	 {
	 	$(".new_business-contact-row").hide();
	 }
	 
	 if(parentContainer.hasClass("des"))
	 {
	 	var transaction_type_id = parentContainer.parent().attr("data-transaction_type_id")
		var transaction_module = parentContainer.parent().attr("data-transaction-module")
	 	/*To populate unselected items - (during ddl display only -tobe-done)*/
		category_id = parentContainer.parent().parent().parent().find(".nam .selected_item_id").val()
		response_url = parentContainer.attr("data-populate")
		if(transaction_type_id ==1 & transaction_module =="purchases")
		{
			var vendor_id = $("#vendor_id").val()
			$.get(response_url, { category_id: category_id, vendor_id: vendor_id});	
		}
		else
		{
			$.get(response_url, { category_id: category_id});	
		}
		
	 }
	 
}



