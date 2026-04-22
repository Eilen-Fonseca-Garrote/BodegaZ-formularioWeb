"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Briefcase, User, Phone, Building2, Send, Leaf, Sprout, Car, Flower2, Bird } from "lucide-react"

// Plazas organizadas por categoría y sexo
const PLAZAS = {
  administrativas: {
    ambos: [
      "Gerente Nivel Empresa",
      "Gerente de Complejo Barbosa y Mercado 51",
    ],
    hombre: [
      "Jefe de Producción",
      "Jefe de Taller",
      "Jefe de Transporte",
      "Jefe de Finca",
      "Jefe de Área Porcina",
      "Jefe de Área Agrícola",
      "Comprador",
      "Supervisor",
    ],
    mujer: [],
  },
  finca: {
    ambos: [
      "Trabajador Agrícola",
    ],
    hombre: [
      "Trabajador de los Cerdos",
      "Cuidador de Caballos",
      "Albañil",
      "Chófer",
      "Elaborador de Alimentos",
      "Trabajador de la Finca",
      "Trabajador Nocturno",
      "Parrillero",
    ],
    mujer: [
      "Empleada Doméstica",
      "Elaboradora de Alimentos",
    ],
  },
  barbosa: {
    hombre: [
      "Elaborador",
      "Almacenero",
      "Carpintero",
      "Herrero",
      "Trabajador Nocturno",
    ],
    mujer: [
      "Económica",
      "Dependiente Gastronómica",
    ],
  },
}

export default function SolicitudEmpleo() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    edad: "",
    celular: "",
    municipio: "",
    sexo: "",
    fumador: "",
    experiencia: "",
    plazas: [] as string[],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Cargar el script de Instagram para embeds
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "//www.instagram.com/embed.js"
    script.async = true
    document.body.appendChild(script)
    
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      // Si cambia el sexo, limpiar las plazas seleccionadas
      if (field === "sexo") {
        return { ...prev, [field]: value, plazas: [] }
      }
      return { ...prev, [field]: value }
    })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  // Función para obtener plazas por categoría y sexo
  const getPlazasPorCategoria = (categoria: "administrativas" | "finca" | "barbosa") => {
    const sexo = formData.sexo as "hombre" | "mujer"
    if (!sexo) return []
    
    const categoriaData = PLAZAS[categoria]
    if (categoria === "administrativas" || categoria === "finca") {
      const ambos = "ambos" in categoriaData ? categoriaData.ambos : []
      return [...ambos, ...categoriaData[sexo]]
    }
    return categoriaData[sexo] || []
  }

  const handlePlazaChange = (plaza: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      plazas: checked
        ? [...prev.plazas, plaza]
        : prev.plazas.filter((p) => p !== plaza),
    }))
    if (errors.plazas) {
      setErrors((prev) => ({ ...prev, plazas: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido"
    if (!formData.apellidos.trim()) newErrors.apellidos = "Los apellidos son requeridos"
    if (!formData.edad.trim()) newErrors.edad = "La edad es requerida"
    if (!formData.celular.trim()) newErrors.celular = "El número de celular es requerido"
    if (!formData.municipio.trim()) newErrors.municipio = "El municipio es requerido"
    if (!formData.sexo) newErrors.sexo = "Por favor seleccione su sexo"
    if (!formData.fumador) newErrors.fumador = "Por favor indique si es fumador"
    if (!formData.experiencia.trim()) newErrors.experiencia = "La experiencia laboral es requerida"
    if (formData.plazas.length === 0) newErrors.plazas = "Seleccione al menos una plaza"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    const mensaje = `*SOLICITUD DE EMPLEO - BODEGA Z*

*DATOS PERSONALES*
Nombre: ${formData.nombre}
Apellidos: ${formData.apellidos}
Edad: ${formData.edad} anos
Celular: ${formData.celular}
Municipio: ${formData.municipio}
Sexo: ${formData.sexo === "hombre" ? "Hombre" : "Mujer"}

*INFORMACION ADICIONAL*
Fumador: ${formData.fumador === "si" ? "Si" : "No"}

*EXPERIENCIA LABORAL*
${formData.experiencia}

*PLAZAS A LAS QUE APLICA*
${formData.plazas.map((p) => `- ${p}`).join("\n")}`

    const whatsappUrl = `https://wa.me/5359160826?text=${encodeURIComponent(mensaje)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4 relative overflow-hidden">
      {/* Decoraciones - Aves azules, Autos, Flores magenta, Plantas */}
      {/* Esquina superior izquierda - Ave azul */}
      <div className="absolute top-4 left-4 w-20 h-20 opacity-20 pointer-events-none">
        <Bird className="w-full h-full text-blue-500 rotate-12" />
      </div>
      {/* Esquina superior derecha - Flor magenta */}
      <div className="absolute top-8 right-8 w-16 h-16 opacity-25 pointer-events-none">
        <Flower2 className="w-full h-full text-accent" />
      </div>
      {/* Lado izquierdo - Hoja */}
      <div className="absolute top-40 left-0 w-24 h-24 opacity-15 pointer-events-none">
        <Leaf className="w-full h-full text-secondary rotate-45" />
      </div>
      {/* Lado derecho - Planta */}
      <div className="absolute top-60 right-0 w-20 h-20 opacity-20 pointer-events-none">
        <Sprout className="w-full h-full text-secondary -rotate-12" />
      </div>
      {/* Centro izquierda - Auto */}
      <div className="absolute top-[45%] left-2 w-16 h-16 opacity-15 pointer-events-none">
        <Car className="w-full h-full text-accent" />
      </div>
      {/* Lateral izquierdo medio - Flor magenta */}
      <div className="absolute top-[55%] left-6 w-12 h-12 opacity-20 pointer-events-none">
        <Flower2 className="w-full h-full text-accent rotate-12" />
      </div>
      {/* Inferior izquierda - Ave azul */}
      <div className="absolute bottom-60 left-4 w-18 h-18 opacity-15 pointer-events-none">
        <Bird className="w-full h-full text-blue-500 -rotate-45" />
      </div>
      {/* Inferior derecha - Hoja */}
      <div className="absolute bottom-40 right-0 w-28 h-28 opacity-15 pointer-events-none">
        <Leaf className="w-full h-full text-secondary -rotate-45" />
      </div>
      {/* Pie centro izquierdo - Auto */}
      <div className="absolute bottom-16 left-20 w-12 h-12 opacity-15 pointer-events-none">
        <Car className="w-full h-full text-accent rotate-12" />
      </div>
      {/* Pie derecho - Flor magenta */}
      <div className="absolute bottom-16 right-10 w-12 h-12 opacity-25 pointer-events-none">
        <Flower2 className="w-full h-full text-accent -rotate-12" />
      </div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header con Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <Image 
              src="/images/bodega-z-logo.png" 
              alt="Bodega.Z Logo - Las Mejores Ofertas" 
              width={180} 
              height={180}
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold text-foreground mt-2">
            Solicitud de Empleo
          </h2>
          <p className="text-muted-foreground mt-2">
            Complete el formulario para aplicar a nuestras plazas disponibles
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Flower2 className="w-5 h-5 text-accent" />
            <Bird className="w-5 h-5 text-blue-500" />
            <Leaf className="w-5 h-5 text-secondary" />
            <Car className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Video de Instagram */}
        <Card className="border-2 border-secondary mb-8 overflow-hidden">
          <CardHeader className="border-b-2 border-secondary bg-card">
            <h2 className="text-lg font-semibold text-secondary uppercase tracking-wide">
              Conoce nuestra empresa
            </h2>
          </CardHeader>
          <CardContent className="p-4 flex justify-center">
            <blockquote
              className="instagram-media"
              data-instgrm-captioned
              data-instgrm-permalink="https://www.instagram.com/reel/DMOEtFCyekI/"
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: 0,
                borderRadius: "3px",
                boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                margin: "1px",
                maxWidth: "540px",
                minWidth: "326px",
                padding: 0,
                width: "calc(100% - 2px)",
              }}
            >
              <div style={{ padding: "16px" }}>
                <a
                  href="https://www.instagram.com/reel/DMOEtFCyekI/"
                  style={{
                    background: "#FFFFFF",
                    lineHeight: 0,
                    padding: "0 0",
                    textAlign: "center",
                    textDecoration: "none",
                    width: "100%",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-muted rounded-full w-10 h-10"></div>
                    <div className="flex-1">
                      <p className="text-foreground text-sm font-medium">Ver en Instagram</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">Cargando video...</p>
                </a>
              </div>
            </blockquote>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardHeader className="border-b-2 border-secondary bg-card">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-secondary uppercase tracking-wide">
                Datos Personales
              </h2>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Nombre y Apellidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-secondary font-medium uppercase text-sm">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  placeholder="Ingrese su nombre"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  className="border-2 border-secondary bg-card focus:ring-primary"
                />
                {errors.nombre && (
                  <p className="text-destructive text-sm">{errors.nombre}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellidos" className="text-secondary font-medium uppercase text-sm">
                  Apellidos
                </Label>
                <Input
                  id="apellidos"
                  placeholder="Ingrese sus apellidos"
                  value={formData.apellidos}
                  onChange={(e) => handleInputChange("apellidos", e.target.value)}
                  className="border-2 border-secondary bg-card focus:ring-primary"
                />
                {errors.apellidos && (
                  <p className="text-destructive text-sm">{errors.apellidos}</p>
                )}
              </div>
            </div>

            {/* Edad */}
            <div className="space-y-2">
              <Label htmlFor="edad" className="text-secondary font-medium uppercase text-sm">
                Edad
              </Label>
              <Input
                id="edad"
                type="number"
                min="18"
                max="99"
                placeholder="Ingrese su edad"
                value={formData.edad}
                onChange={(e) => handleInputChange("edad", e.target.value)}
                className="border-2 border-secondary bg-card focus:ring-primary max-w-[150px]"
              />
              {errors.edad && (
                <p className="text-destructive text-sm">{errors.edad}</p>
              )}
            </div>

            {/* Celular */}
            <div className="space-y-2">
              <Label htmlFor="celular" className="text-secondary font-medium uppercase text-sm flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Número de Celular
              </Label>
              <Input
                id="celular"
                type="tel"
                placeholder="+53 XXXXXXXX"
                value={formData.celular}
                onChange={(e) => handleInputChange("celular", e.target.value)}
                className="border-2 border-secondary bg-card focus:ring-primary"
              />
              {errors.celular && (
                <p className="text-destructive text-sm">{errors.celular}</p>
              )}
            </div>

            {/* Municipio */}
            <div className="space-y-2">
              <Label htmlFor="municipio" className="text-secondary font-medium uppercase text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Municipio
              </Label>
              <Input
                id="municipio"
                placeholder="Ingrese su municipio"
                value={formData.municipio}
                onChange={(e) => handleInputChange("municipio", e.target.value)}
                className="border-2 border-secondary bg-card focus:ring-primary"
              />
              {errors.municipio && (
                <p className="text-destructive text-sm">{errors.municipio}</p>
              )}
            </div>

            {/* Sexo */}
            <div className="space-y-3">
              <Label className="text-secondary font-medium uppercase text-sm">
                Sexo
              </Label>
              <RadioGroup
                value={formData.sexo}
                onValueChange={(value) => handleInputChange("sexo", value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hombre" id="sexo-hombre" className="border-2 border-secondary text-primary" />
                  <Label htmlFor="sexo-hombre" className="text-foreground cursor-pointer">
                    Hombre
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mujer" id="sexo-mujer" className="border-2 border-secondary text-primary" />
                  <Label htmlFor="sexo-mujer" className="text-foreground cursor-pointer">
                    Mujer
                  </Label>
                </div>
              </RadioGroup>
              {errors.sexo && (
                <p className="text-destructive text-sm">{errors.sexo}</p>
              )}
            </div>

            {/* Fumador */}
            <div className="space-y-3">
              <Label className="text-secondary font-medium uppercase text-sm">
                ¿Es fumador?
              </Label>
              <RadioGroup
                value={formData.fumador}
                onValueChange={(value) => handleInputChange("fumador", value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="fumador-si" className="border-2 border-secondary text-primary" />
                  <Label htmlFor="fumador-si" className="text-foreground cursor-pointer">
                    Sí
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="fumador-no" className="border-2 border-secondary text-primary" />
                  <Label htmlFor="fumador-no" className="text-foreground cursor-pointer">
                    No
                  </Label>
                </div>
              </RadioGroup>
              {errors.fumador && (
                <p className="text-destructive text-sm">{errors.fumador}</p>
              )}
            </div>

            {/* Experiencia Laboral */}
            <div className="space-y-2">
              <Label htmlFor="experiencia" className="text-secondary font-medium uppercase text-sm">
                Experiencia Laboral
              </Label>
              <Textarea
                id="experiencia"
                placeholder="Describa su experiencia laboral anterior..."
                value={formData.experiencia}
                onChange={(e) => handleInputChange("experiencia", e.target.value)}
                className="border-2 border-secondary bg-card focus:ring-primary min-h-[120px] resize-none"
              />
              {errors.experiencia && (
                <p className="text-destructive text-sm">{errors.experiencia}</p>
              )}
            </div>

            {/* Plazas */}
            <div className="space-y-4">
              <Label className="text-secondary font-medium uppercase text-sm">
                Plazas para las que aplica
              </Label>
              {!formData.sexo ? (
                <p className="text-muted-foreground text-sm p-4 border-2 border-dashed border-secondary rounded-md bg-muted/30">
                  Primero seleccione su sexo para ver las plazas disponibles
                </p>
              ) : (
                <div className="space-y-6">
                  {/* Plazas Administrativas */}
                  {getPlazasPorCategoria("administrativas").length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">
                        Plazas Administrativas
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border-2 border-secondary rounded-md bg-muted/30">
                        {getPlazasPorCategoria("administrativas").map((plaza) => (
                          <div key={plaza} className="flex items-center space-x-3">
                            <Checkbox
                              id={plaza}
                              checked={formData.plazas.includes(plaza)}
                              onCheckedChange={(checked) =>
                                handlePlazaChange(plaza, checked as boolean)
                              }
                              className="border-2 border-secondary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <Label
                              htmlFor={plaza}
                              className="text-foreground cursor-pointer text-sm"
                            >
                              {plaza}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Plazas Trabajo en Finca */}
                  {getPlazasPorCategoria("finca").length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">
                        Plazas para Trabajo en la Finca
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border-2 border-secondary rounded-md bg-muted/30">
                        {getPlazasPorCategoria("finca").map((plaza) => (
                          <div key={plaza} className="flex items-center space-x-3">
                            <Checkbox
                              id={`finca-${plaza}`}
                              checked={formData.plazas.includes(plaza)}
                              onCheckedChange={(checked) =>
                                handlePlazaChange(plaza, checked as boolean)
                              }
                              className="border-2 border-secondary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <Label
                              htmlFor={`finca-${plaza}`}
                              className="text-foreground cursor-pointer text-sm"
                            >
                              {plaza}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Plazas Barbosa */}
                  {getPlazasPorCategoria("barbosa").length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">
                        Plazas para Barbosa
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border-2 border-secondary rounded-md bg-muted/30">
                        {getPlazasPorCategoria("barbosa").map((plaza) => (
                          <div key={plaza} className="flex items-center space-x-3">
                            <Checkbox
                              id={`barbosa-${plaza}`}
                              checked={formData.plazas.includes(plaza)}
                              onCheckedChange={(checked) =>
                                handlePlazaChange(plaza, checked as boolean)
                              }
                              className="border-2 border-secondary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <Label
                              htmlFor={`barbosa-${plaza}`}
                              className="text-foreground cursor-pointer text-sm"
                            >
                              {plaza}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {errors.plazas && (
                <p className="text-destructive text-sm">{errors.plazas}</p>
              )}
            </div>

            {/* Submit Button - Verde WhatsApp */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg gap-2"
            >
              <Send className="w-5 h-5" />
              Enviar por WhatsApp
            </Button>

            <p className="text-center text-muted-foreground text-sm">
              Al hacer clic, se abrirá WhatsApp con su solicitud lista para enviar
            </p>
          </CardContent>
        </Card>

        {/* Imagen promocional Barbosa */}
        <Card className="border-2 border-secondary mt-8 overflow-hidden">
          <CardContent className="p-0">
            <Image
              src="/images/barbosa-promo.png"
              alt="Bodega Z - Venta Mayorista de Productos de Primera Necesidad - Visitanos en Barbosa"
              width={800}
              height={450}
              className="w-full h-auto object-cover"
            />
          </CardContent>
        </Card>

        <footer className="text-center mt-8 text-muted-foreground text-sm">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Flower2 className="w-4 h-4 text-accent" />
            <Bird className="w-4 h-4 text-blue-500" />
            <Leaf className="w-4 h-4 text-secondary" />
            <Car className="w-4 h-4 text-primary" />
          </div>
          <p className="font-medium text-foreground mb-1">Bodega.Z - Las Mejores Ofertas</p>
          <a 
            href="https://www.instagram.com/bodega_z_/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-secondary hover:underline font-medium"
          >
            @bodega_z_
          </a>
        </footer>
      </div>
    </main>
  )
}
