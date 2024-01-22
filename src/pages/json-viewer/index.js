import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useEffect, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { EditorState } from "@codemirror/state";
import styles from "./index.module.css";
import Head from "@docusaurus/Head";
import 'reactflow/dist/style.css';
import ReactFlow, { Background, Controls } from "reactflow";
import { lintGutter, lintKeymap, linter, } from "@codemirror/lint";
import { keymap } from "@codemirror/view";

let editor;

export default function JsonViewer() {
  const { siteConfig } = useDocusaurusContext();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    editor = new EditorView({
      parent: document.getElementById("json-editor"),
      state: EditorState.create({
        extensions: [basicSetup, json(), keymap.of(lintKeymap), lintGutter(), linter(jsonParseLinter())],
      }),
    });
  }, []);

  const format = async () => {
    try {

      const result = await window.prettier.format(editor.state.doc.toString(), { parser: 'json', printWidth: 1, tabWidth: 2, singleAttributePerLine: true, semi: false, plugins: [window.prettierPlugins.babel, window.prettierPlugins.estree], });
      editor.dispatch({
        changes: {
          from: 0,
          to: editor.state.doc.length,
          insert: result,
        },
      });
    } catch (er) {
      console.log(er)
    }
  }



  const chart = async () => {
    try {
      const string = await window.prettier.format(editor.state.doc.toString(), { parser: 'json', printWidth: 1, tabWidth: 2, singleAttributePerLine: true, semi: false, plugins: [window.prettierPlugins.babel, window.prettierPlugins.estree], });
      const json = JSON.parse(string);

      const nodes = [];
      const edges = [];
      let x = 0;
      let y = 0;
    }
    catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      <Head>
        <script src="https://unpkg.com/prettier@3.2.4/standalone.js"></script>
        <script src="https://unpkg.com/prettier@3.2.4/plugins/babel.js"></script>
        <script src="https://unpkg.com/prettier@3.2.4/plugins/estree.js"></script>


      </Head>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />"
      >
        {/* <HomepageHeader /> */}
        <main className={styles.main}>
          {/* <HomepageFeatures /> */}

          <div id="json-editor" className={styles.editor}></div>
          <div className={styles.button_wrapper}>
            <button
              className="button button--secondary button--lg"
              onClick={format}
            >
              Format
            </button>
            <button
              className="button button--secondary button--lg"
              onClick={chart}
            >
              Chart
            </button>
          </div>
          <div className={styles.tree_view}>
            <div className={styles.chart}>
              <ReactFlow nodes={nodes} edges={edges}>
                <Background />
                <Controls />
              </ReactFlow>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
