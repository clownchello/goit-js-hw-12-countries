import debounce from 'lodash.debounce'

import { refs } from './constans'
import API from './services'
import { countriesListMarkup } from './markups'

const { $input, $resultContainer } = refs

const handleChangeInput = async ({ target: { value } }) => {
    if (value) {
        const response = await API.fetchCountries(value)
        response.length > 0 && render(response)
        return
    }
    !value && clearResultContainer()
}

const handleDebounceTyping = debounce(handleChangeInput, 500)
$input.addEventListener('input', handleDebounceTyping)

function render(items) {
    $resultContainer.innerHTML = countriesListMarkup(items)
}

function clearResultContainer() {
    $resultContainer.innerHTML = ''
}
