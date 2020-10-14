import { shallowMount } from '@vue/test-utils'
import SvgIcon from '@/components/SvgIcon/index.vue'
describe('SvgIcon.vue', () => {
  it('name', () => {
    const wrapper = shallowMount(SvgIcon, {
      propsData: {
        name: 'home',
      }
    })
    expect(wrapper.find('use').attributes().href).toBe('#icon-home')
  })
  
  it('noClassName', () => {
    const wrapper = shallowMount(SvgIcon, {
      propsData: {
        name: 'home',
      }
    })
    expect(wrapper.classes().length).toBe(1)
    wrapper.setProps({ className: 'svg-icon' })
    expect(wrapper.classes().includes('svg-icon')).toBe(true)
  })

  it('withClassName', () => {
    const wrapper = shallowMount(SvgIcon, {
      propsData: {
        name: 'home',
        className: 'test'
      }
    })
    expect(wrapper.classes().length).toBe(2)
    wrapper.setProps({ className: 'svg-icon test' })
    expect(wrapper.classes().includes('test')).toBe(true)
  })
})
