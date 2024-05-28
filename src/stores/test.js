import { defineStore } from 'pinia'

const useTest = defineStore('test', {
    state: () => {
        return {
            test: 111
        }
    }
})

export default useTest
