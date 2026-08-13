import type { ReactElement } from "react";
import { component, fields } from "@keystatic/core";

/** Shape shared by every Keystatic form field's preview props (text, image, etc.) */
type PreviewField<T> = {
  value: T;
  onChange: (value: T) => void;
  schema: {
    Input: (props: {
      value: T;
      onChange: (value: T) => void;
      autoFocus: boolean;
      forceValidation: boolean;
    }) => ReactElement | null;
  };
};

/** Delegates to the field's own real editor UI instead of hand-rolling inputs. */
function FieldInput<T>({ field }: { field: PreviewField<T> }) {
  const Input = field.schema.Input;
  return (
    <Input
      value={field.value}
      onChange={field.onChange}
      autoFocus={false}
      forceValidation={false}
    />
  );
}

export const sectionBreak = component({
  label: "Section Break",
  schema: {
    label: fields.text({
      label: "Label",
      description: 'e.g. "02 / The Backstory"',
    }),
  },
  preview: (props) => <FieldInput field={props.fields.label} />,
});

const statSchema = {
  value: fields.text({ label: "Value", description: 'e.g. "500+"' }),
  label: fields.text({ label: "Label", description: 'e.g. "Orders Shipped"' }),
};

export const statRow = component({
  label: "Stat Row",
  schema: {
    stat1: fields.object(statSchema, { label: "Stat 1" }),
    stat2: fields.object(statSchema, { label: "Stat 2 (optional)" }),
    stat3: fields.object(statSchema, { label: "Stat 3 (optional)" }),
  },
  preview: (props) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(["stat1", "stat2", "stat3"] as const).map((key) => (
        <div key={key} style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <FieldInput field={props.fields[key].fields.value} />
          </div>
          <div style={{ flex: 2 }}>
            <FieldInput field={props.fields[key].fields.label} />
          </div>
        </div>
      ))}
    </div>
  ),
});

export const framedPhoto = component({
  label: "Framed Photo",
  schema: {
    image: fields.image({
      label: "Image",
      directory: "public/pages",
      publicPath: "/pages",
    }),
    alt: fields.text({
      label: "Alt text",
      validation: { isRequired: true },
    }),
    catalogLabel: fields.text({
      label: "Catalog label (optional)",
      description: 'e.g. "File · Press_01.tif"',
    }),
  },
  preview: (props) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <FieldInput field={props.fields.image} />
      <FieldInput field={props.fields.alt} />
      <FieldInput field={props.fields.catalogLabel} />
    </div>
  ),
});
