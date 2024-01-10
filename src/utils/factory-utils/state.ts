import type { AuthState, ResourceState } from '@/types';

interface ResourceUpdatesPayloads<T extends { id: string }> {
  ready?: { raw: Record<string, T> };
  raw?: Record<string, T>;
  selected?: { id: string };
}

export const auth = {
  initial(): AuthState {
    return {
      ready: false,
      user: false,
    };
  },

  ready(user: boolean): AuthState {
    return {
      ready: true,
      user,
    };
  },
};

export const resource = {
  initial<T extends { id: string }>(): ResourceState<T> {
    return {
      ready: false,
      raw: {},
      data: [],
      selected: null,
    };
  },

  ready<T extends { id: string }>(raw: Record<string, T>): ResourceState<T> {
    return {
      ready: true,
      raw,
      data: Object.values(raw),
      selected: null,
    };
  },

  updates<T extends { id: string }>(
    payloads: ResourceUpdatesPayloads<T>,
    state: ResourceState<T>,
  ): ResourceState<T> {
    if (payloads.ready) {
      const { raw } = payloads.ready;
      return {
        ...state,
        ready: true,
        raw,
        data: Object.values(raw),
      };
    }
    if (payloads.raw) {
      const { raw } = payloads;
      return {
        ...state,
        raw,
        data: Object.values(raw),
        selected: state.selected ? raw[state.selected.id] : null,
      };
    }
    if (payloads.selected) {
      const { id } = payloads.selected;
      return {
        ...state,
        selected: state.raw[id],
      };
    }

    return state;
  },
};
