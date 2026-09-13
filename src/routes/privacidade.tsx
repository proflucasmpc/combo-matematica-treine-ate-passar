import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  component: PoliticaDePrivacidade,
});

function PoliticaDePrivacidade() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <a
          href="/"
          className="mb-8 inline-block text-sm text-primary hover:underline"
        >
          ← Voltar para a página inicial
        </a>

        <h1 className="mb-2 text-3xl font-bold md:text-4xl">
          Política de Privacidade
        </h1>

        <p className="mb-10 text-sm text-muted-foreground">
          Última atualização: 11 de julho de 2026
        </p>

        <div className="space-y-8 leading-relaxed text-foreground/85">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              1. Sobre esta política
            </h2>

            <p>
              Esta Política de Privacidade explica como as informações pessoais
              dos visitantes, interessados e compradores podem ser coletadas,
              utilizadas, armazenadas e compartilhadas durante a utilização
              deste site e a aquisição do material “80 Simulados de
              Matemática”.
            </p>

            <p className="mt-3">
              O responsável por este site e pelo produto é o Prof. Lucas MPC.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              2. Informações fornecidas pelo usuário
            </h2>

            <p>
              Podemos receber informações fornecidas voluntariamente pelo
              usuário quando ele entra em contato pelo WhatsApp, solicita
              suporte, realiza uma compra ou interage com nossos canais de
              atendimento.
            </p>

            <p className="mt-3">
              Essas informações podem incluir nome, número de telefone,
              endereço de e-mail, concurso de interesse, mensagens enviadas e
              informações relacionadas à compra.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              3. Compra pela Hotmart
            </h2>

            <p>
              A compra do produto é realizada em ambiente externo administrado
              pela Hotmart. Ao clicar em um botão de compra, o usuário será
              direcionado para o checkout da plataforma.
            </p>

            <p className="mt-3">
              Dados de pagamento, como número de cartão e informações
              financeiras, não são inseridos nem armazenados diretamente neste
              site.
            </p>

            <p className="mt-3">
              A Hotmart poderá compartilhar com o responsável pelo produto
              determinadas informações necessárias para confirmar a compra,
              entregar o material, prestar suporte e cumprir obrigações legais.
            </p>

            <a
              href="https://hotmart.com/pt-br/legal/privacidade-de-dados"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-semibold text-primary hover:underline"
            >
              Consultar a Política de Privacidade da Hotmart
            </a>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              4. Informações coletadas automaticamente
            </h2>

            <p>
              O site ou os serviços utilizados para sua hospedagem poderão
              registrar automaticamente informações técnicas, como endereço
              IP, tipo de dispositivo, navegador, sistema operacional, data,
              horário e páginas acessadas.
            </p>

            <p className="mt-3">
              Essas informações poderão ser utilizadas para garantir o
              funcionamento e a segurança do site, identificar falhas e
              compreender de forma geral como a página é utilizada.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              5. Finalidades do tratamento
            </h2>

            <p>Os dados poderão ser utilizados para:</p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>entregar o produto adquirido;</li>
              <li>confirmar e administrar compras;</li>
              <li>prestar suporte e responder dúvidas;</li>
              <li>enviar informações relacionadas ao produto;</li>
              <li>prevenir fraudes e usos indevidos;</li>
              <li>melhorar o funcionamento do site e do atendimento;</li>
              <li>cumprir obrigações legais e regulatórias;</li>
              <li>defender direitos em processos administrativos ou judiciais.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              6. Bases legais
            </h2>

            <p>
              O tratamento de dados poderá ocorrer para a execução de contrato
              ou de procedimentos relacionados à compra, para o cumprimento de
              obrigações legais, para o exercício regular de direitos, com
              base em interesse legítimo ou mediante consentimento, quando ele
              for necessário.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              7. Compartilhamento de informações
            </h2>

            <p>
              As informações poderão ser compartilhadas somente quando isso for
              necessário para o funcionamento da operação, incluindo:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Hotmart, para pagamento, entrega e administração da compra;</li>
              <li>
                WhatsApp e seus respectivos provedores, quando o usuário iniciar
                uma conversa;
              </li>
              <li>serviços de hospedagem e infraestrutura tecnológica;</li>
              <li>
                prestadores que auxiliem no suporte, segurança ou funcionamento
                do site;
              </li>
              <li>
                autoridades públicas, quando houver obrigação legal ou ordem
                válida.
              </li>
            </ul>

            <p className="mt-3">
              Os dados pessoais não serão vendidos a terceiros.
            </p>
          </section>
<section>
  <h2 className="mb-3 text-xl font-semibold text-foreground">
    8. Cookies, Pixel da Meta e tecnologias semelhantes
  </h2>

  <p>
    Este site utiliza cookies e tecnologias semelhantes para garantir seu
    funcionamento, compreender a utilização da página e medir os resultados
    das campanhas publicitárias.
  </p>

  <p className="mt-3">
    Utilizamos o Pixel da Meta, fornecido pela Meta Platforms, para registrar
    eventos como visualizações da página e ajudar a medir a eficácia dos
    anúncios exibidos no Facebook e no Instagram.
  </p>

  <p className="mt-3">
    Por meio dessa tecnologia, poderão ser processadas informações como
    endereço IP, navegador, dispositivo utilizado, páginas acessadas, data,
    horário e interações realizadas no site.
  </p>

  <p className="mt-3">
    Os cookies e recursos de publicidade não essenciais somente serão
    carregados após a autorização do visitante por meio do aviso de cookies.
    A recusa não impedirá o acesso ao conteúdo nem a compra do produto.
  </p>

  <p className="mt-3">
    O visitante poderá recusar esses recursos ou apagar os cookies armazenados
    nas configurações de seu navegador. A exclusão ou o bloqueio poderá
    limitar apenas funções relacionadas à análise e à personalização de
    publicidade.
  </p>

  <p className="mt-3">
    Ao acessar o checkout da Hotmart, o usuário também estará sujeito às
    tecnologias, políticas de privacidade e regras de tratamento de dados
    adotadas pela própria plataforma.
  </p>

  <p className="mt-3">
    Informações adicionais sobre o tratamento realizado pela Meta podem ser
    consultadas na política de privacidade da empresa.
  </p>

  <a
    href="https://www.facebook.com/privacy/policy/"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-3 inline-block font-semibold text-primary hover:underline"
  >
    Consultar a Política de Privacidade da Meta
  </a> </section>
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              9. Armazenamento e conservação
            </h2>

            <p>
              Os dados serão mantidos somente pelo período necessário para
              cumprir as finalidades descritas nesta política, prestar suporte,
              atender obrigações legais, preservar registros de compras ou
              exercer direitos.
            </p>

            <p className="mt-3">
              Após esse período, os dados poderão ser eliminados ou
              anonimizados, salvo quando sua conservação for permitida ou
              exigida pela legislação.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              10. Direitos do titular
            </h2>

            <p>
              Nos termos da legislação aplicável, o titular poderá solicitar,
              quando cabível:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>confirmação da existência de tratamento;</li>
              <li>acesso aos seus dados pessoais;</li>
              <li>correção de dados incompletos ou desatualizados;</li>
              <li>informações sobre compartilhamentos realizados;</li>
              <li>eliminação de dados tratados com consentimento;</li>
              <li>revogação do consentimento;</li>
              <li>oposição a tratamentos realizados de forma irregular.</li>
            </ul>

            <p className="mt-3">
              A solicitação poderá exigir a confirmação da identidade do
              titular para evitar acesso indevido às informações.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              11. Segurança
            </h2>

            <p>
              São adotadas medidas razoáveis para proteger as informações contra
              acessos não autorizados, perda, alteração, divulgação ou
              utilização indevida.
            </p>

            <p className="mt-3">
              Apesar dessas medidas, nenhum sistema conectado à internet pode
              garantir segurança absoluta.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              12. Links externos
            </h2>

            <p>
              Este site contém links para serviços externos, como Hotmart e
              WhatsApp. Cada serviço possui seus próprios termos e políticas de
              privacidade.
            </p>

            <p className="mt-3">
              Recomendamos que o usuário consulte essas políticas antes de
              fornecer informações pessoais nessas plataformas.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              13. Alterações nesta política
            </h2>

            <p>
              Esta política poderá ser atualizada em razão de mudanças no site,
              nas ferramentas utilizadas, nos serviços oferecidos ou na
              legislação.
            </p>

            <p className="mt-3">
              A data da atualização mais recente permanecerá informada no início
              desta página.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              14. Contato
            </h2>

            <p>
              Para dúvidas ou solicitações relacionadas à privacidade e ao
              tratamento de dados pessoais, entre em contato pelo WhatsApp:
            </p>

            <a
              href="https://wa.me/5511960189699?text=Ol%C3%A1%2C%20professor%20Lucas.%20Tenho%20uma%20solicita%C3%A7%C3%A3o%20sobre%20meus%20dados%20pessoais."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-semibold text-primary hover:underline"
            >
              (11) 96018-9699
            </a>
          </section>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          © 2026 Prof. Lucas MPC. Todos os direitos reservados.
        </div>
      </div>
    </main>
  );
}
