export const RegisterFormSchema = [

    {
        $formkit: 'text',
        name: 'fullname',
        label: 'Full name',
        // help: 'Enter your full name.',
        validation: 'required|length:3,64'

    },
    {
        $formkit: 'date',
        name: 'birthdate',
        label: 'Birthdate',
        // help: 'Enter your birthdate.',
        validation: 'required|date'
    },
    {
        $formkit: 'text',
        name: 'email',
        label: 'Email',
        // help: 'This will be used for your account.',
        validation: 'required|email'
    },
    {
        $formkit: 'password',
        name: 'password',
        label: 'Password',
        // help: 'Enter your new password.',
        validation: 'required|length:5,16'
    },
    {
        $formkit: 'password',
        name: 'password_confirm',
        label: 'Confirm password',
        // help: 'Enter your new password again to confirm it.',
        validation: 'required|confirm',
        validationLabel: 'password confirmation',
    },
]

export const LoginFormSchema = [
    {
        $formkit: 'text',
        name: 'email',
        label: 'Email',
        // help: 'This will be used for your account.',
        validation: 'required|email'
    },
    {
        $formkit: 'password',
        name: 'password',
        label: 'Password',
        // help: 'Enter your new password.',
        validation: 'required|length:5,16'
    },
]