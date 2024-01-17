import styles from "./OpenSource.module.css";

export const OpenSource = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img
          src="https://komarev.com/ghpvc/?username=namnh240795&style=flat"
          alt="namnh240795"
        />

        <img src="https://shields.io/github/stars/namnh240795" />
      </div>

      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th className={styles.package}>Package</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h4>Transform Integer Number To Vietnamese</h4>
            </td>
            <td>
              <h4>
                <a
                  href="https://www.npmjs.com/package/number-to-text-vietnamese"
                  target="_blank"
                >
                  number-to-text-vietnamese
                </a>
              </h4>
            </td>
          </tr>
          <tr>
            <td>
              <h4>
                Provide token for requests, refreshing token automatically
              </h4>
            </td>
            <td>
              <h4>
                <a
                  href="https://www.npmjs.com/package/brainless-token-manager"
                  target="_blank"
                >
                  brainless-token-manager
                </a>
              </h4>
            </td>
          </tr>
          <tr>
            <td>
              <h4>
                Generate iconfont and icon components in react-native (Similar
                as AntDesign Icons, MaterialIcons)
              </h4>
            </td>
            <td>
              <h4>
                <a
                  href="https://www.npmjs.com/package/react-native-svgs-to-icon"
                  target="_blank"
                >
                  react-native-svgs-to-icon
                </a>
              </h4>
            </td>
          </tr>
          <tr>
            <td>
              <h4>Github action to verify message using commitlint</h4>
            </td>
            <td>
              <h4>
                <a
                  href="https://github.com/marketplace/actions/namnh240795-verify-commit-message-action"
                  target="_blank"
                >
                  @namnh240795/verify-commit-message-action@v1.12
                </a>
              </h4>
            </td>
          </tr>
          <tr>
            <td>
              <h4>Github action to verify branch name</h4>
            </td>
            <td>
              <h4>
                <a
                  href="https://github.com/marketplace/actions/namnh240795-verify-branch-name-action"
                  target="_blank"
                >
                  @namnh240795/verify-branch-name-action@v1.1.3
                </a>
              </h4>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
