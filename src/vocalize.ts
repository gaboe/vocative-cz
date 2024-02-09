export function vocalize(name: string | null | undefined): string | null {
  if (!name) {
    return name === null || name === undefined ? null : "";
  }

  return name.split(" ").map(vocativeSingleName).join(" ");
}

function vocativeSingleName(name: string): string {
  const replacementPair = getReplacementPair(name);

  if (replacementPair[0] === "" && replacementPair[1] === "") {
    return name;
  }

  if (replacementPair[1] === "") {
    return name.slice(0, -1);
  }

  if (replacementPair[0] === "") {
    return (
      name +
      (name[name.length - 1].toLowerCase() === name[name.length - 1]
        ? replacementPair[1]
        : replacementPair[1].toUpperCase())
    );
  }

  const replacing = name.slice(-replacementPair[0].length);
  if (replacing.toUpperCase() === replacing) {
    return (
      name.slice(0, -replacementPair[0].length) +
      replacementPair[1].toUpperCase()
    );
  }

  if (/^[A-ZÁČĎÉÍŇÓŘŠŤÚÝŽ][a-záčďéěíňóřšťúůýž]*$/.test(replacing)) {
    return name.slice(0, -replacementPair[0].length); // Additional handling might be required for case transformations
  }

  if (name[name.length - 1].toUpperCase() === name[name.length - 1]) {
    return (
      name.slice(0, -replacementPair[0].length) +
      replacementPair[1].toUpperCase()
    );
  }

  return name.slice(0, -replacementPair[0].length) + replacementPair[1];
}

function getReplacementPair(name: string): [string, string] {
  const paddedName = ` ${name.toLowerCase()}`;
  let replacementPair: [string, string];

  switch (paddedName[paddedName.length - 1]) {
    case "a":
      replacementPair =
        paddedName[paddedName.length - 2] === "i" ? ["a", "e"] : ["a", "o"];
      break;
    case "n":
      switch (paddedName[paddedName.length - 2]) {
        case "o":
          if (paddedName[paddedName.length - 3] === "i") {
            replacementPair =
              paddedName[paddedName.length - 5] === "y" ? ["", "e"] : ["", ""];
          } else {
            replacementPair = ["", "e"];
          }
          break;
        case "i":
          switch (paddedName[paddedName.length - 3]) {
            case "r":
              if (paddedName[paddedName.length - 4] === "a") {
                replacementPair =
                  paddedName[paddedName.length - 5] === "m"
                    ? ["", "e"]
                    : ["", ""];
              } else {
                replacementPair = ["", ""];
              }
              break;
            case "l":
              replacementPair =
                paddedName[paddedName.length - 4] === "r"
                  ? ["", "e"]
                  : ["", ""];
              break;
            default:
              replacementPair = ["", "e"];
              break;
          }
          break;
        case "í":
          replacementPair =
            paddedName[paddedName.length - 3] === "r" ? ["", ""] : ["", "e"];
          break;
        case "e":
          replacementPair = (() => {
            switch (paddedName[paddedName.length - 3]) {
              case "m":
                return paddedName[paddedName.length - 4] === "m"
                  ? ["", "e"]
                  : ["", ""];
              case "r":
                return paddedName[paddedName.length - 4] === "o"
                  ? ["", "e"]
                  : ["", ""];
              default:
                return ["", "e"];
            }
          })();
          break;
        case "y":
          replacementPair =
            paddedName[paddedName.length - 3] === "r" ? ["", "e"] : ["", ""];
          break;
        case "á":
          replacementPair =
            paddedName[paddedName.length - 3] === "p"
              ? ["án", "ane"]
              : ["", "e"];
          break;
        default:
          replacementPair =
            paddedName[paddedName.length - 2] === "u" ? ["", "o"] : ["", "e"];
          break;
      }
      break;
    case "l":
      switch (paddedName[paddedName.length - 2]) {
        case "e":
          switch (paddedName[paddedName.length - 3]) {
            case "i":
              if (paddedName[paddedName.length - 4] === "r") {
                replacementPair =
                  paddedName[paddedName.length - 5] === "u"
                    ? ["", ""]
                    : ["", "i"];
              } else {
                replacementPair = ["", "i"];
              }
              break;
            case "r":
              replacementPair =
                paddedName[paddedName.length - 4] === "a"
                  ? ["el", "le"]
                  : ["", "i"];
              break;
            case "v":
              replacementPair =
                paddedName[paddedName.length - 5] === "p"
                  ? ["el", "le"]
                  : ["el", "li"];
              break;
            case "k":
              replacementPair =
                paddedName[paddedName.length - 4] === "a"
                  ? ["", ""]
                  : ["", "i"];
              break;
            default:
              replacementPair =
                paddedName[paddedName.length - 3] === "h"
                  ? ["", ""]
                  : ["", "i"];
              break;
          }
          break;
        case "i":
          replacementPair =
            paddedName[paddedName.length - 3] === "a" ? ["", "o"] : ["", "e"];
          break;
        case "ě":
        case "á":
        case "s":
          replacementPair = ["", "i"];
          break;
        case "ů":
          replacementPair = ["ůl", "ole"];
          break;
        default:
          replacementPair = ["", "e"];
          break;
      }
      break;
    case "m":
      switch (paddedName[paddedName.length - 2]) {
        case "a":
          if (paddedName[paddedName.length - 3] === "i") {
            replacementPair =
              paddedName[paddedName.length - 4] === "r" ? ["", ""] : ["", "e"];
          } else {
            replacementPair = ["", "e"];
          }
          break;
        default:
          replacementPair =
            paddedName[paddedName.length - 2] === "ů"
              ? ["ům", "ome"]
              : ["", "e"];
          break;
      }
      break;
    case "c":
      switch (paddedName[paddedName.length - 2]) {
        case "e":
          if (paddedName[paddedName.length - 3] === "v") {
            replacementPair =
              paddedName[paddedName.length - 4] === "š"
                ? ["vec", "evče"]
                : ["ec", "če"];
          } else {
            replacementPair = ["ec", "če"];
          }
          break;
        case "i":
          replacementPair =
            paddedName[paddedName.length - 4] === "o" ? ["", "i"] : ["", "u"];
          break;
        default:
          replacementPair =
            paddedName[paddedName.length - 2] === "a" ? ["", "u"] : ["", "i"];
          break;
      }
      break;
    case "e":
      switch (paddedName[paddedName.length - 2]) {
        case "n":
          replacementPair = (() => {
            switch (paddedName[paddedName.length - 3]) {
              case "n":
                return paddedName[paddedName.length - 7] === "b"
                  ? ["", ""]
                  : ["e", "o"];
              default:
                return paddedName[paddedName.length - 3] === "g"
                  ? ["e", "i"]
                  : ["", ""];
            }
          })();
          break;
        case "c":
          replacementPair = (() => {
            switch (paddedName[paddedName.length - 3]) {
              case "i":
                return paddedName[paddedName.length - 4] === "r"
                  ? ["e", "i"]
                  : ["", ""];
              default:
                return paddedName[paddedName.length - 3] === "v"
                  ? ["", ""]
                  : ["e", "i"];
            }
          })();
          break;
        case "d":
          replacementPair =
            paddedName[paddedName.length - 3] === "l" ? ["e", "o"] : ["", ""];
          break;
        case "g":
          if (paddedName[paddedName.length - 3] === "r") {
            replacementPair =
              paddedName[paddedName.length - 4] === "a" ? ["", ""] : ["e", "i"];
          } else {
            replacementPair = ["e", "i"];
          }
          break;
        case "l":
          if (paddedName[paddedName.length - 3] === "l") {
            replacementPair = (() => {
              switch (paddedName[paddedName.length - 4]) {
                case "e":
                  return ["e", "o"];
                case "o":
                  return ["", ""];
                default:
                  return ["e", "i"];
              }
            })();
          } else {
            replacementPair = ["", ""];
          }
          break;
        case "s":
          replacementPair =
            paddedName[paddedName.length - 3] === "s" ? ["e", "i"] : ["e", "o"];
          break;
        case "h":
          replacementPair =
            paddedName[paddedName.length - 3] === "t" ? ["", ""] : ["e", "i"];
          break;
        case "k":
          replacementPair = ["", ""];
          break;
        default:
          replacementPair =
            paddedName[paddedName.length - 2] === "k" ? ["", "u"] : ["", ""];
          break;
      }
      break;
    case "s":
      switch (paddedName[paddedName.length - 2]) {
        case "e":
          switch (paddedName[paddedName.length - 3]) {
            case "n":
              replacementPair = (() => {
                switch (paddedName[paddedName.length - 4]) {
                  case "e":
                    return ["s", ""];
                  case "á":
                    return ["", "i"];
                  default:
                    return ["", ""];
                }
              })();
              break;
            case "l":
              switch (paddedName[paddedName.length - 4]) {
                case "u":
                  replacementPair =
                    paddedName[paddedName.length - 5] === "j"
                      ? ["", "i"]
                      : ["s", ""];
                  break;
                default: {
                  const c = paddedName[paddedName.length - 4];
                  replacementPair =
                    c === "o" || c === "r" ? ["", "i"] : ["s", ""];
                  break;
                }
              }
              break;
            case "r":
              replacementPair =
                paddedName[paddedName.length - 4] === "e"
                  ? ["s", "ro"]
                  : ["", "i"];
              break;
            case "d":
            case "t":
            case "m":
              replacementPair = ["s", ""];
              break;
            case "u":
              replacementPair = ["s", "u"];
              break;
            case "p":
              replacementPair = ["es", "se"];
              break;
            case "x":
              replacementPair = ["es", "i"];
              break;
            default:
              replacementPair = ["", "i"];
              break;
          }
          break;
        case "i":
          switch (paddedName[paddedName.length - 3]) {
            case "r":
              if (paddedName[paddedName.length - 4] === "a") {
                replacementPair =
                  paddedName[paddedName.length - 5] === "p"
                    ? ["s", "de"]
                    : ["s", "to"];
              } else {
                replacementPair = ["", "i"];
              }
              break;
            case "n":
              replacementPair =
                paddedName[paddedName.length - 4] === "f"
                  ? ["s", "de"]
                  : ["", "i"];
              break;
            default:
              replacementPair =
                paddedName[paddedName.length - 3] === "m"
                  ? ["s", "do"]
                  : ["", "i"];
              break;
          }
          break;
        case "o":
          replacementPair = (() => {
            switch (paddedName[paddedName.length - 3]) {
              case "m":
                return paddedName[paddedName.length - 4] === "i"
                  ? ["os", "e"]
                  : ["", "i"];
              case "k":
                return ["", "e"];
              case "x":
                return ["os", "i"];
              default:
                return ["os", "e"];
            }
          })();
          break;
        case "a":
          replacementPair = (() => {
            switch (paddedName[paddedName.length - 3]) {
              case "r":
                return paddedName[paddedName.length - 4] === "a"
                  ? ["", "i"]
                  : ["as", "e"];
              case "l":
                return paddedName[paddedName.length - 4] === "l"
                  ? ["s", "do"]
                  : ["", "i"];
              default:
                return paddedName[paddedName.length - 3] === "y"
                  ? ["as", "e"]
                  : ["", "i"];
            }
          })();
          break;
        case "r":
          replacementPair =
            paddedName[paddedName.length - 3] === "a" ? ["s", "te"] : ["", "i"];
          break;
        case "u":
          switch (paddedName[paddedName.length - 3]) {
            case "n":
              replacementPair = (() => {
                switch (paddedName[paddedName.length - 4]) {
                  case "e":
                    return paddedName[paddedName.length - 5] === "v"
                      ? ["us", "ero"]
                      : ["", "i"];
                  default:
                    return paddedName[paddedName.length - 4] === "g"
                      ? ["", "i"]
                      : ["us", "e"];
                }
              })();
              break;
            case "e":
              replacementPair =
                paddedName[paddedName.length - 4] === "z"
                  ? ["zeus", "die"]
                  : ["us", "e"];
              break;
            case "m":
              replacementPair =
                paddedName[paddedName.length - 4] === "t"
                  ? ["us", "e"]
                  : ["", "i"];
              break;
            case "g":
            case "a":
              replacementPair = ["", "i"];
              break;
            case "h":
              replacementPair = ["", "e"];
              break;
            case "c":
            case "k":
              replacementPair = ["s", ""];
              break;
            default:
              replacementPair = ["us", "e"];
              break;
          }
          break;
        case "y":
          replacementPair =
            paddedName[paddedName.length - 4] === "a" ? ["", "i"] : ["", ""];
          break;
        default:
          replacementPair =
            paddedName[paddedName.length - 2] === "é" ? ["s", "e"] : ["", "i"];
          break;
      }
      break;
    case "o":
      replacementPair =
        paddedName[paddedName.length - 2] === "l" ? ["", "i"] : ["", ""];
      break;
    case "x":
      replacementPair =
        paddedName[paddedName.length - 2] === "n" ? ["x", "go"] : ["", "i"];
      break;
    case "i":
      switch (paddedName[paddedName.length - 2]) {
        case "n":
          replacementPair =
            paddedName[paddedName.length - 4] === "e" ? ["", ""] : ["", "o"];
          break;
        case "m":
          replacementPair =
            paddedName[paddedName.length - 3] === "a" ? ["", ""] : ["", "o"];
          break;
        case "r":
          replacementPair =
            paddedName[paddedName.length - 3] === "i" ? ["", "o"] : ["", ""];
          break;
        default: {
          const c = paddedName[paddedName.length - 2];
          replacementPair = ["s", "a", "o", "c", "t"].includes(c)
            ? ["", "i"]
            : ["", ""];
          break;
        }
      }
      break;
    case "t":
      replacementPair = (() => {
        switch (paddedName[paddedName.length - 2]) {
          case "i":
            return paddedName[paddedName.length - 3] === "l"
              ? ["", "e"]
              : ["", ""];
          case "u":
            return paddedName[paddedName.length - 3] === "r"
              ? ["", ""]
              : ["", "e"];
          default:
            return ["", "e"];
        }
      })();
      break;
    case "r":
      switch (paddedName[paddedName.length - 2]) {
        case "e":
          switch (paddedName[paddedName.length - 3]) {
            case "d":
              if (paddedName[paddedName.length - 4] === "i") {
                replacementPair =
                  paddedName[paddedName.length - 5] === "e"
                    ? ["", "e"]
                    : ["", "i"];
              } else {
                replacementPair = ["er", "re"];
              }
              break;
            case "t":
              replacementPair = (() => {
                switch (paddedName[paddedName.length - 4]) {
                  case "e":
                    return paddedName[paddedName.length - 5] === "p"
                      ? ["", "e"]
                      : ["", "o"];
                  case "s":
                    return paddedName[paddedName.length - 5] === "o"
                      ? ["", "e"]
                      : ["", ""];
                  default:
                    return paddedName[paddedName.length - 4] === "n"
                      ? ["", "i"]
                      : ["", "e"];
                }
              })();
              break;
            default: {
              const c = paddedName[paddedName.length - 3];
              replacementPair = ["g", "k"].includes(c)
                ? ["er", "ře"]
                : ["", "e"];
              break;
            }
          }
          break;
        case "a":
          replacementPair = (() => {
            switch (paddedName[paddedName.length - 3]) {
              case "m":
                return paddedName[paddedName.length - 4] === "g"
                  ? ["", ""]
                  : ["", "e"];
              case "l":
                return paddedName[paddedName.length - 5] === "p"
                  ? ["", ""]
                  : ["", "e"];
              default:
                return ["", "e"];
            }
          })();
          break;
        case "o":
          replacementPair =
            paddedName[paddedName.length - 3] === "n" ? ["", "o"] : ["", "e"];
          break;
        default: {
          const cDefault = paddedName[paddedName.length - 2];
          replacementPair = ["d", "t", "b"].includes(cDefault)
            ? ["r", "ře"]
            : ["", "e"];
          break;
        }
      }
      break;
    case "j":
      replacementPair = (() => {
        switch (paddedName[paddedName.length - 2]) {
          case "o":
            return paddedName[paddedName.length - 3] === "t"
              ? ["oj", "ý"]
              : ["", "i"];
          case "i":
            return paddedName[paddedName.length - 3] === "d"
              ? ["", "i"]
              : ["ij", "ý"];
          default:
            return paddedName[paddedName.length - 2] === "y"
              ? ["yj", "ý"]
              : ["", "i"];
        }
      })();
      break;
    case "d":
      replacementPair = (() => {
        switch (paddedName[paddedName.length - 2]) {
          case "i":
            return paddedName[paddedName.length - 3] === "r"
              ? ["", ""]
              : ["", "e"];
          case "u":
            return paddedName[paddedName.length - 3] === "a"
              ? ["", ""]
              : ["", "e"];
          default:
            return ["", "e"];
        }
      })();
      break;
    case "y": {
      const c = paddedName[paddedName.length - 2];
      replacementPair = ["a", "g", "o"].includes(c) ? ["", "i"] : ["", ""];
      break;
    }
    case "h":
      replacementPair = (() => {
        switch (paddedName[paddedName.length - 2]) {
          case "c":
            switch (paddedName[paddedName.length - 3]) {
              case "r":
                return ["", "i"];
              case "ý":
                return ["", ""];
              default:
                return ["", "u"];
            }
          case "t":
            return paddedName[paddedName.length - 3] === "e"
              ? ["", "e"]
              : ["", "i"];
          case "a":
            return paddedName[paddedName.length - 3] === "o"
              ? ["", "u"]
              : ["", ""];
          default:
            return paddedName[paddedName.length - 2] === "ů"
              ? ["ůh", "ože"]
              : ["", "i"];
        }
      })();
      break;

    // Continuing from the previous cases
    case "v":
      replacementPair =
        paddedName[paddedName.length - 2] === "ů" ? ["", ""] : ["", "e"];
      break;
    case "u":
      replacementPair =
        paddedName[paddedName.length - 2] === "t" ? ["", ""] : ["", "i"];
      break;
    case "k":
      replacementPair = (() => {
        switch (paddedName[paddedName.length - 2]) {
          case "ě":
            return paddedName[paddedName.length - 3] === "n"
              ? ["něk", "ňku"]
              : ["k", "če"];
          default:
            return paddedName[paddedName.length - 2] === "e"
              ? ["ek", "ku"]
              : ["", "u"];
        }
      })();
      break;
    case "g":
      if (paddedName[paddedName.length - 2] === "i") {
        replacementPair =
          paddedName[paddedName.length - 3] === "e" ? ["", ""] : ["", "u"];
      } else {
        replacementPair = ["", "u"];
      }
      break;
    case "ň":
      replacementPair =
        paddedName[paddedName.length - 2] === "o" ? ["ň", "ni"] : ["ůň", "oni"];
      break;
    case "f":
    case "p":
    case "b":
      replacementPair = ["", "e"];
      break;
    case "w":
    case "í":
    case "á":
    case "ý":
    case "ů":
    case "é":
      replacementPair = ["", ""];
      break;
    default:
      replacementPair = ["", "i"];
      break;
  }

  return replacementPair;
}

export default vocalize;
