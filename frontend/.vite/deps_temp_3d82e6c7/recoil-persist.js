import {
  __commonJS
} from "./chunk-WXXH56N5.js";

// node_modules/recoil-persist/dist/index.js
var require_dist = __commonJS({
  "node_modules/recoil-persist/dist/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.recoilPersist = void 0;
    var recoilPersist = (config = {}) => {
      if (typeof window === "undefined") {
        return {
          persistAtom: () => {
          }
        };
      }
      const { key = "recoil-persist", storage = localStorage, converter = JSON } = config;
      const persistAtom = ({ onSet, node, trigger, setSelf }) => {
        if (trigger === "get") {
          const state = getState();
          if (typeof state.then === "function") {
            state.then((s) => {
              if (s.hasOwnProperty(node.key)) {
                setSelf(s[node.key]);
              }
            });
          }
          if (state.hasOwnProperty(node.key)) {
            setSelf(state[node.key]);
          }
        }
        onSet(async (newValue, _, isReset) => {
          const state = getState();
          if (typeof state.then === "function") {
            state.then((s) => updateState(newValue, s, node.key, isReset));
          } else {
            updateState(newValue, state, node.key, isReset);
          }
        });
      };
      const updateState = (newValue, state, key2, isReset) => {
        if (isReset) {
          delete state[key2];
        } else {
          state[key2] = newValue;
        }
        setState(state);
      };
      const getState = () => {
        const toParse = storage.getItem(key);
        if (toParse === null || toParse === void 0) {
          return {};
        }
        if (typeof toParse === "string") {
          return parseState(toParse);
        }
        if (typeof toParse.then === "function") {
          return toParse.then(parseState);
        }
        return {};
      };
      const parseState = (state) => {
        if (state === void 0) {
          return {};
        }
        try {
          return converter.parse(state);
        } catch (e) {
          console.error(e);
          return {};
        }
      };
      const setState = (state) => {
        try {
          if (typeof storage.mergeItem === "function") {
            storage.mergeItem(key, converter.stringify(state));
          } else {
            storage.setItem(key, converter.stringify(state));
          }
        } catch (e) {
          console.error(e);
        }
      };
      return { persistAtom };
    };
    exports.recoilPersist = recoilPersist;
  }
});
export default require_dist();
//# sourceMappingURL=recoil-persist.js.map
