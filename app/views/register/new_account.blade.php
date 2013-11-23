<div id="registration_form">
	<h1>Register new account</h1>
	@if($errors->count() > 0)
		<?php $error_messages = $errors->all() ?>
		<ul class="alert alert-error">
			@foreach($error_messages as $error_message)
				<li>{{ $error_message }}</li>
			@endforeach
		</ul>
	@endif
	<div id="account_informations">
		<div>
			<span class="title">Linked account type: </span><span class="linked_content">{{ $provider }}</span>
		</div>
		<div>
			<span class="title">Full name: </span><span class="linked_content">{{ $first_name }} {{ $last_name }}</span>
		</div>
		<div>
			<span class="title">Email: </span><span class="linked_content">{{ $email }}</span>
		</div>
	</div>
	{{ Form::open(array('action' => 'Register\FacebookController@getNew_account', 'method' => 'PUT', 'class' => 'form1')) }}
	{{ Form::password('password', array('placeholder' => 'Password')) }}
	{{ Form::submit('Create Account', array('id' => 'create', 'class' => 'button2')) }}
	{{ Form::close() }}
</div>