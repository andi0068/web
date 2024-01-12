import type { AuthState, ResourceState } from '@/types';

interface ResourceUpdatesPayloads<T extends { id: string }> {
  ready?: {
    raw: Record<string, T>;
    selected?: { id: string };
  };
  raw?: Record<string, T>;
  selected?: { id: string } | null;
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
      const { raw, selected } = payloads.ready;
      return {
        ready: true,
        raw,
        data: Object.values(raw),
        selected: selected ? raw[selected.id] : null,
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
    if (payloads.selected === null) {
      return {
        ...state,
        selected: null,
      };
    }

    return state;
  },
};
