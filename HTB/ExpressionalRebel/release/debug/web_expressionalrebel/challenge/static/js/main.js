$(document).ready(function(e) {

	displayActive();
	
	$('.page-link').click(function(e) {
		$(".page-item").removeClass('active')
		$(this).parent().addClass('active')
		displayActive();
	});

	$('#submitBtn').on('click', submitCsp);
});

$('[data-toggle="collapse"]').click(function(e) {
	$('.collapse.in').collapse('hide')
});

const displayActive = () => {
	active = $(".page-item.active").children()[0]
	target = active.id.split('-').at(-1)
	$('.menu-content').hide().filter(`#menu-content-${target}`).show();
}

const addAlert = (message, type) => {
	const accordionCsp = $('#accordion-csp');
	accordionCsp.empty()
	$('<p/>')
		.addClass(`alert alert-${type}`)
		.text(message)
		.appendTo(accordionCsp)
}

const genAccHeader = (directive) => {
	return $('<h2>').addClass('accordion-header').attr('id',`heading-${directive}`).append(
		$('<button>').addClass('accordion-button collapsed').attr('type','button')
			.attr('data-bs-toggle','collapse')
			.attr('data-bs-target',`#content-${directive}`)
			.attr('aria-expanded','false').attr('aria-controls',`content-${directive}`)
			.text(directive)	
	)
}

const issuesToDom = (issues) => {
	let dom = []
	for (const iss of issues) {
		dom.push(
			$('<div/>').addClass('list-group-item').append(
				$('<dl/>').addClass('row').append([
					$('<dt/>').addClass('col-sm-3').text(iss.value ? iss.value : iss.directive), 
					$('<dd/>').addClass('col-sm-9').text(iss.description)
				])
			)
		)
	}
	return dom
}

const addResponse = (response) => {
	const accordionCsp = $('#accordion-csp');
	accordionCsp.empty();
	for (const item of response) {
		let {directive} = item;
		console.log(item)
		accordionCsp.append(
			$('<div/>')
				.addClass('accordion-item')
				.append([
					genAccHeader(directive),
					$('<div/>').attr('id',`content-${directive}`).addClass('accordion-collapse collapse')
						.attr('aria-labelledby',`heading-${this.directive}`)
						.attr('data-bs-parent','#accordion-csp')
						.append(
							$('<div/>').addClass('accordion-body').append(
								$('<ul/>').addClass('list-group').append(issuesToDom(item['issues']))
							)
						)
					
				])
		)
	}
}


const submitCsp = async () => {
	const csp = $('#cspText').val();
	if ($.trim(csp) === '') {
		addAlert('Submit a non empty CSP', 'info');
		return;
	}
	await fetch('/api/evaluate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				csp: csp
			}),
		})
		.then((response) => {
			if(response.status !== 200){
				addAlert('Server error', 'danger');
			} else {
				response.json()
				.then((resp) => {
					addResponse(resp);
				})
			}

		})
		.catch((error) => {
			addAlert('There was an error connecting with the server', 'info');
		});
}