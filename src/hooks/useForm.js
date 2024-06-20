import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
    // Estado local para almacenar el estado del formulario
    const [formState, setFormState] = useState(initialForm);
    // Estado local para almacenar la validación del formulario
    const [formValidation, setFormValidation] = useState({});

    // Efecto para crear validadores cuando cambia el estado del formulario
    useEffect(() => {
        createValidators();
    }, [formState]);

    // Efecto para reiniciar el formulario cuando cambia el formulario inicial
    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    // Memo para determinar si el formulario es válido
    const isFormValid = useMemo(() => {
        // Recorre todas las validaciones y verifica si hay algún error
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false; // Si hay un error, el formulario no es válido
        }
        return true; // Si no hay errores, el formulario es válido
    }, [formValidation]);

    // Función para manejar el cambio en los campos del formulario
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Función para restablecer el formulario a su estado inicial
    const onResetForm = () => {
        setFormState(initialForm);
    };

    // Función para crear validadores basados en las validaciones proporcionadas
    const createValidators = () => {
        const formCheckedValues = {};

        // Itera sobre todas las validaciones definidas para cada campo del formulario
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];

            // Evalúa la función de validación en el estado actual del campo y establece el mensaje de error correspondiente
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        // Actualiza el estado de validación del formulario con los resultados obtenidos
        setFormValidation(formCheckedValues);
    };

    // Devuelve todas las propiedades y funciones necesarias para manejar el formulario
    return {
        ...formState,      // Estado actual del formulario
        formState,         // Alias para el estado actual del formulario
        onInputChange,     // Función para manejar cambios en los campos del formulario
        onResetForm,       // Función para restablecer el formulario
        ...formValidation, // Estado de validación del formulario
        isFormValid,       // Booleano que indica si el formulario es válido
    };
};