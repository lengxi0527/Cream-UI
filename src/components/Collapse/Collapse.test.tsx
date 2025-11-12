import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import Collapse from "./Collapse.vue";
import Item from "./CollapseItem.vue"

describe('collapse', () => {
  test('basic collapse', async() => {
    const warraper = mount(() =>
      <Collapse modelValue={['a']}>
        <Item name="a" title="Title A">
          <h1>headline title</h1>
          <div>this is content a aaa</div>
        </Item>
        <Item name="b" title="Title B">
          <div>this is bbbbb test</div>
        </Item>
        <Item name="c" title="Disabled Title" disabled>
          <div>this is cccc test</div>
        </Item>
      </Collapse>
      , {
        global: {
          stubs: ['Icon']
        },
        attachTo:document.body
      })
    console.log(warraper.html())
    const headers = warraper.findAll('.vk-collapse-item__header')
    const contents = warraper.findAll('.vk-collapse-item__wrapper')

    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    const firstContent = contents[0]
    const secondContent = contents[1]
    expect(firstContent?.isVisible()).toBeTruthy()
    expect(secondContent?.isVisible()).toBeFalsy()

    await headers[0]?.trigger('click')
    console.log(firstContent?.html())
    expect(firstContent?.isVisible()).toBeFalsy()
  })
})
