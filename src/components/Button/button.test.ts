import { test, describe, expect } from "vitest";
import { mount } from '@vue/test-utils'
import Button from "./Button.vue";
import Icon from "../Icon/Icon.vue";
describe('button.vue', () => {
  test('basic button', () => {
    const warpper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'test button'
      }
    })
    console.log(warpper.html())
    expect(warpper.classes()).toContain('vk-button--primary')
    // slot
    // get/find
    expect(warpper.get('button').text()).toBe('test button')

    // events
    warpper.get('button').trigger('click')
    console.log(warpper.emitted())
    expect(warpper.emitted()).toHaveProperty('click')
  })

  test('disabled', () => {
    const warpper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'disabled'
      }

    })
    // attributes
    expect(warpper.attributes('disabled')).toBeDefined()
    expect(warpper.find('button').element.disabled).toBeDefined()
    warpper.get('button').trigger('click')
    expect(warpper.emitted()).not.toHaveProperty('click')
  }
  )

  test('icon', ()=>{
    const warpper = mount(Button, {
      props:{
        loading:true
      },
      slots:{
        default: 'loading'
      },
      global:{
        stubs: ['Icon']
      }
    })
    console.log(warpper.html())
    const iconElement = warpper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(warpper.attributes('disabled')).toBeDefined()
  })
})
