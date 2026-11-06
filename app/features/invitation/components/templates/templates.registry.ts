import type { Component } from 'vue'
import UmmKulthumTemplate from './UmmKulthumTemplate.vue'

/**
 * Central Registry for Bespoke & Custom Client Templates.
 * Any new design can simply be registered here by templateId.
 */
export const CUSTOM_TEMPLATES_REGISTRY: Record<string, Component> = {
  'umm-kulthum': UmmKulthumTemplate,
}

export const hasCustomTemplate = (templateId?: string): boolean => {
  if (!templateId) return false
  return Boolean(CUSTOM_TEMPLATES_REGISTRY[templateId])
}

export const getCustomTemplateComponent = (templateId?: string): Component | null => {
  if (!templateId) return null
  return CUSTOM_TEMPLATES_REGISTRY[templateId] || null
}

