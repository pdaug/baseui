// components
import Section from "./Section";

const SectionTest = function () {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>Section</div>
      <div style={{ alignItems: "flex-start", display: "flex", gap: "1rem" }}>
        <Section
          title="Lorem ipsum dolor sit amet"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent semper tincidunt arcu, vitae imperdiet ligula ornare in. Vestibulum eu dapibus arcu, et scelerisque sem."
          onCancel={function () {
            return;
          }}
          onConfirm={function () {
            return;
          }}
        >
          <span>Children</span>
        </Section>

        <Section
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent semper tincidunt arcu, vitae imperdiet ligula ornare in. Vestibulum eu dapibus arcu, et scelerisque sem."
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          actions={[
            {
              text: "Button 1",
              category: "secondary",
            },
            {
              text: "Button 2",
              category: "warn",
            },
          ]}
        >
          <span>Children</span>
        </Section>
      </div>
    </div>
  );
};

export default SectionTest;
