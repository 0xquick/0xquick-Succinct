
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn generate_proof(score: u32) -> String {
    let proof = format!("Proof for score: {}", score);
    proof
}
