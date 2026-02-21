const mongoose = require("mongoose");
const { Schema } = mongoose;
const EQUIPMENTS_V2_COLLECTION =
  process.env.EQUIPMENTS_V2_COLLECTION || "equipments-v2";

const equipmentSchema = new Schema(
  {
    url: { type: String, trim: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, trim: true, index: true },
    manufacturer: { type: String, trim: true, index: true },
    model: { type: String, trim: true },
    year: { type: Number, index: true },
    weight: { type: Number, index: true }, // e.g. "17500 kg"
    hours: { type: Number, index: true }, // hourmeter reading as a number
    dimensions: {
      transport_length_m: { type: Number, index: true },
      transport_width_m: { type: Number, index: true },
      transport_height_m: { type: Number, index: true },
    }, // e.g. "9.8 × 2.6 × 3.2 m"
    serial_number: { type: String, trim: true },
    condition: {
      type: String,
      enum: ["Excellent", "Good", "Fair", "Poor"],
      default: "Good",
    },
    sold_from: { type: String },
    description: { type: String },
    price: { type: Number, index: true }, // stored as number, e.g. 121000
    currency: { type: String, default: "EUR" },
    price_type: { type: String }, // e.g. "Buy Now Price"
    average_market_price: { type: Number },
    seller_location: { type: String },
    thumbnail_url: { type: String },
    all_images: [{ type: String }],
    video_url: { type: String },

    detailed_specifications: {
      general: {
        serial_no: { type: String },
        condition: { type: String },
      },
      cabin: {
        hourmeter_reading: { type: Number },
        hour_meter_verified: { type: Boolean },
        steering_control_type: { type: String },
        gauges: { type: Boolean },
        ac: { type: Boolean },
        heating: { type: Boolean },
        cab_door: { type: Boolean },
        windows: { type: Boolean },
        wipers: { type: Boolean },
        structure: { type: Boolean },
        rear_camera: { type: Boolean },
        pre_equipment_3d: { type: String },
        supplemental_steering: { type: String },
        awd: { type: String },
        extras: { type: String },
      },
      engine: {
        brand_model: { type: String },
        blow_by_at_idle: { type: Boolean },
        oil_leaks: { type: Boolean },
        oil_level: { type: Boolean },
        exhaust_system: { type: Boolean },
        smoke: { type: Boolean },
        cooling_system: { type: Boolean },
        belts: { type: Boolean },
        filters: { type: Boolean },
        engine_hood: { type: Boolean },
      },
      exterior: {
        chassis: { type: Boolean },
        steps_and_handrails: { type: Boolean },
        overall_body_condition: { type: Boolean },
        rims_and_wheel_nuts: { type: Boolean },
        lights: { type: String }, // can be Boolean or a note string
        machine_lubrication: { type: Boolean },
        central_lubrication_type: { type: String },
      },
      attachments: {
        center_blade: { type: Boolean },
        front_blade: { type: Boolean },
        a_frame: { type: Boolean },
        push_block: { type: String },
        ripper: { type: String },
        scarifier: { type: Boolean },
      },
      hydraulics: {
        hydraulic_fluid_level: { type: Boolean },
        hoses_and_lines: { type: Boolean },
        pump_and_valve_block: { type: Boolean },
        valve_sections: { type: Boolean },
        circle_drive_gear: { type: Boolean },
        steering_cylinders: { type: Boolean },
        blade_cylinders: { type: Boolean },
        ripper_cylinder: { type: Boolean },
      },
      functional_test: {
        transmission_test: { type: Boolean },
        clutch: { type: Boolean },
        tandem_noises: { type: Boolean },
        brakes: { type: Boolean },
        steering: { type: Boolean },
        supplemental_steering: { type: Boolean },
        wheel_lean: { type: Boolean },
        electrical_system: { type: Boolean },
        blade_pins: { type: Boolean },
        blade_side_shift: { type: Boolean },
        circle_play: { type: Boolean },
        blade_operation: { type: Boolean },
        ripper_operation: { type: String },
        scarifier_operation: { type: Boolean },
      },
      tyres: {
        tires_type: { type: String },
        tires_brand: { type: String },
        tires_size: { type: String },
        front_right: { type: Schema.Types.Mixed }, // Boolean or percentage string
        middle_right: { type: Schema.Types.Mixed },
        rear_right: { type: Schema.Types.Mixed },
        rear_left: { type: Schema.Types.Mixed },
        middle_left: { type: Schema.Types.Mixed },
        front_left: { type: Schema.Types.Mixed },
      },
      dimensions: {
        gross_weight_kg: { type: Number },
        transport_length_m: { type: Number },
        transport_height_m: { type: Number },
        transport_width_m: { type: Number },
      },
      certification: {
        registration_certificate: { type: String },
        ce_marked: { type: String },
      },
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    collection: EQUIPMENTS_V2_COLLECTION,
  },
);

// Useful indexes for filtering/searching
equipmentSchema.index({ category: 1, manufacturer: 1 });
equipmentSchema.index({ price: 1 });
equipmentSchema.index({ year: 1, hours: 1 });
equipmentSchema.index({ name: "text", description: "text" }); // full-text search

const Equipment = mongoose.model("Equipment", equipmentSchema);
module.exports = Equipment;
