import asyncio
import os
import edge_tts

AGENT_VOICE = "pt-BR-FranciscaNeural"
CLIENT_MALE_VOICE = "pt-BR-AntonioNeural"
CLIENT_FEMALE_VOICE = "pt-BR-ThalitaMultilingualNeural"

SCENARIOS = [
    {
        "id": "health-booking",
        "dialogue": [
            {
                "voice": AGENT_VOICE,
                "text": "Olá, Carlos! Aqui é a assistente virtual da Clínica Viva. Você tem uma consulta agendada com o Doutor Eduardo para amanhã às 14 e 30. Você confirma sua presença?",
            },
            {
                "voice": CLIENT_MALE_VOICE,
                "text": "Oi! Amanhã às 14 e 30 eu tive um imprevisto. Vocês teriam algum horário disponível na quinta-feira de manhã?",
            },
            {
                "voice": AGENT_VOICE,
                "text": "Com certeza! Tenho quinta-feira às 9 e 15 ou às 11 horas. Qual desses horários fica melhor para você?",
            },
            {
                "voice": CLIENT_MALE_VOICE,
                "text": "Às 11 horas fica perfeito.",
            },
            {
                "voice": AGENT_VOICE,
                "text": "Prontinho, Carlos! Sua consulta foi remarcada para quinta-feira, às 11 horas. Acabei de te enviar a confirmação com a localização no seu WhatsApp e RCS. Tenha um ótimo dia!",
            },
        ],
    },
    {
        "id": "b2b-qualification",
        "dialogue": [
            {
                "voice": AGENT_VOICE,
                "text": "Olá, Mariana! Sou a assistente executiva da Nexus Tech. Vi que você baixou nossa proposta de Link Dedicado e PABX em Nuvem. Posso te fazer duas perguntas rápidas?",
            },
            {
                "voice": CLIENT_FEMALE_VOICE,
                "text": "Oi, pode sim! Estamos precisando interligar duas filiais em Suzano.",
            },
            {
                "voice": AGENT_VOICE,
                "text": "Excelente! Quantos computadores e ramais vocês pretendem conectar nessa operação?",
            },
            {
                "voice": CLIENT_FEMALE_VOICE,
                "text": "Cerca de 45 computadores e 20 ramais telefônicos.",
            },
            {
                "voice": AGENT_VOICE,
                "text": "Perfeito! Nosso especialista em engenharia telecom já pode apresentar o projeto com topologia e valores amanhã às 15 horas. Posso enviar o convite para o seu e-mail corporativo?",
            },
        ],
    },
    {
        "id": "support-tier1",
        "dialogue": [
            {
                "voice": AGENT_VOICE,
                "text": "Olá! Bem-vindo à central de atendimento. Como posso te ajudar hoje?",
            },
            {
                "voice": CLIENT_MALE_VOICE,
                "text": "Olá, preciso do código Pix da minha fatura que vence hoje, não recebi no e-mail.",
            },
            {
                "voice": AGENT_VOICE,
                "text": "Localizei seu cadastro pelo número de telefone. O valor da sua fatura deste mês é de 129 reais e 90 centavos. Acabei de enviar o código Pix Copia e Cola e o boleto em PDF para o seu celular via RCS e SMS.",
            },
            {
                "voice": CLIENT_MALE_VOICE,
                "text": "Já chegou aqui, muito obrigado!",
            },
            {
                "voice": AGENT_VOICE,
                "text": "Por nada, Roberto! Precisando de qualquer outra coisa, estamos à disposição 24 horas.",
            },
        ],
    },
]

async def generate_scenario_audio(scenario):
    out_dir = os.path.join("public", "audio", "voice-ai")
    os.makedirs(out_dir, exist_ok=True)
    
    scenario_id = scenario["id"]
    combined_audio_path = os.path.join(out_dir, f"{scenario_id}.mp3")
    
    print(f"Generating audio for scenario: {scenario_id}...")
    
    combined_bytes = bytearray()
    
    for idx, turn in enumerate(scenario["dialogue"]):
        communicate = edge_tts.Communicate(turn["text"], turn["voice"])
        turn_bytes = bytearray()
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                turn_bytes.extend(chunk["data"])
        
        combined_bytes.extend(turn_bytes)
        # Small silence between speech turns
        # 0.5s pause can be simulated with a short silence or naturally concatenated mp3 frames
    
    with open(combined_audio_path, "wb") as f:
        f.write(combined_bytes)
        
    print(f"Saved: {combined_audio_path} ({len(combined_bytes)} bytes)")

async def main():
    for scenario in SCENARIOS:
        await generate_scenario_audio(scenario)
    print("All scenario audios generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
